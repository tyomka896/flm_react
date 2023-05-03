#!/usr/bin/python3
# coding: ISO-8859-1

import xml.etree.ElementTree as ET
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
import numpy as np
import re
import sys
import io
from itertools import product
import json
from os import path
if len(sys.argv) != 3:
    print("???")
    sys.exit()

inputValues =json.loads(sys.argv[1])#json.loads(sys.argv[1])#{1:'2',2:'-27.5',3:'-17.5'}
fileName = sys.argv[2]#sys.argv[2] #'d:/pyshell/utep_dva_nl.xml'


# с комментариями - True / без комментариев - False
isWithComments = False

def startModelling(path,uslovie, comment, var):
    global keys
    keys={}
    inputTM = {}
    inputStructure =[]
    outputStructure =[]
    global inputValues
    global variantToReturn    
    inputValues = uslovie
    fileName = path
    isWithComments = comment
    variantToReturn = var
    global ES_counter
    ES_counter = {}
    global TMs
    Tms = {}
    global Structure
    Structure = {}
    global Edges
    Edges = {}
    global Pravila
    pravila = {}
    global levelsObr
    levelsObr = 0
    global myPravila2
    global myPravila    
    myPravila2 = {}
    myPravila = {}
    
    
    #shutil.copy(fileName, tempfile.gettempdir() +'/dest.tmp')
    fileNameNew = fileName#fileName #tempfile.gettempdir() +'/dest.tmp'
    f_read = open(fileNameNew  , "r")
    last_line = f_read.readlines()[-1]
    f_read.close()
    if str(last_line) != "</FLMMODEL>\n":
        #print("lastLIne =" + last_line)
        with open(fileNameNew , "r+") as f:
            data = f.read()
            f.seek(0)
            f.write('<FLMMODEL>' + data)
            f.close()
        with open(fileNameNew , 'a') as f:
            f.write('\n</FLMMODEL>\n')
            f.close()
        # ПАРСИНГ XML
    xml = ET.parse(fileNameNew )
    ES_counter = int(xml.find('./counter').text)

    TMs = xml.findall('./TM')
    Structure = xml.find('./structure')
    Edges = xml.find('./graph').findall('edges')
    Pravila = xml.find('./pravila_temp')

    inputStructure = Structure.findall('n_input')
    for i in range(0,len(inputStructure)):
        inputStructure[i] = inputStructure[i].text

    outputStructure = Structure.findall('n_output')

    for i in range(0,len(outputStructure)):
        outputStructure[i] = outputStructure[i].text


    for i in range(0,len(Structure)):
        if(keys.__contains__(Structure[i].tag.split("_")[1])):
            keys[Structure[i].tag.split("_")[1]].append(Structure[i].text)
        if(Structure[i].tag.split("_")[1] != 'input' and Structure[i].tag.split("_")[1] != 'output' 
            and not keys.__contains__(Structure[i].tag.split("_")[1])):
            levelsObr = levelsObr + 1
            keys[Structure[i].tag.split("_")[1]]=[]
            keys[Structure[i].tag.split("_")[1]].append(Structure[i].text)
    keys['input'] = inputStructure
    keys['output'] = outputStructure    
    
    for i in range(0,len(keys['input'])):
        inputTM[keys['input'][i]]=TermMnogestvo(keys['input'][i])

    PlotsArr = {}
    for i in inputValues.keys():
        PlotsArr[i] = plt.subplots(figsize=(20,3))   
        for y in range(0, int(inputTM[str(i)].termsCount)):
            col = (np.random.random(), np.random.random(), np.random.random())
            PlotsArr[i][1].plot(inputTM[str(i)].coord['x'+str(y+1)], inputTM[str(i)].coord['y'+str(y+1)], color=col, linestyle='--', marker='o', alpha=1, label = inputTM[str(i)].termsName[y])


    
    for i in inputValues.keys():
        GetMinKoeffInputLevel(i, inputValues[i],PlotsArr[i][1].lines)
    tm = {}
    # если несколько вариантов просчета
    # correct
    if(len(myPravila2.keys())>0):    
        if(len(myPravila2.keys())==1):
            answer = []
            inEnd = False
            for t in myPravila2.keys():
                keysCount = len(myPravila2[t])                
                for p in myPravila2[t]:
                    if(myPravila2[t].index(p)+1 == len(myPravila2[t]) ):
                        inEnd = True
                    myPravila[t] = p
                    for i in range(0, levelsObr):
                         for y in range(0,len(keys[str(i+1)])):
                            tm[keys[str(i+1)][y]]=TermMnogestvo(keys[str(i+1)][y])
                    for i in range(0,len(keys['output'])):
                        tm[keys['output'][i]]=TermMnogestvo(keys['output'][i])                       
                    for i in range (0,len(keys['output'])):
                        if(isWithComments):
                            print("If " + inputTM[str(t)].label +'('+ inputTM[str(t)].termsName[int(p.split('_')[0])-1] +' = '+p.split('_')[1] +') '+"==> "+ tm[keys['output'][i]].label+"("+tm[keys['output'][i]].termsName[(int(myPravila[int(keys['output'][i])].split('_')[0]) - 1 )]+")" + "(" + myPravila[int(keys['output'][i])].split('_')[1] + ")\n")
                        else:                            
                            answer.insert(len(answer), [myPravila[int(keys['output'][i])].split('_')[0],myPravila[int(keys['output'][i])].split('_')[1] ])
                            if (inEnd):
                                if (variantToReturn == 3) :
                                    return answer
                                if (variantToReturn == 2) :
                                    return answer[1]
                                if (variantToReturn == 1) :
                                    return answer[0]
                  
        if(len(myPravila2.keys())>1):
            #мешаем правила
            archives = []
            for o in myPravila2.keys():
                ar = []
                for m in range(0,len(myPravila2[o])):
                    ar.append(str(o)+':'+str(myPravila2[o][m]))
                archives.append(ar)  
            for i in Combinefunc(archives[0],archives[1]):
                #  условие
                uslovie = "If "
                for y in i.split('__'):
                    uslovie +=  inputTM[str(y.split(':')[0])].label + "(" + inputTM[str(y.split(':')[0])].termsName[int(y.split(':')[1].split('_')[0])-1]  +"), "
                    myPravila[int(y.split(':')[0])] = y.split(':')[1]

                for a in range(0, levelsObr):
                    for y in range(0,len(keys[str(a+1)])):
                        tm[keys[str(a+1)][y]]=TermMnogestvo(keys[str(a+1)][y])
                for a in range(0,len(keys['output'])):
                    tm[keys['output'][a]]=TermMnogestvo(keys['output'][a])           
                for a in range (0,len(keys['output'])):
                    if(isWithComments):
                        print(uslovie + "==> "+ tm[keys['output'][a]].label+"("+tm[keys['output'][a]].termsName[(int(myPravila[int(keys['output'][a])].split('_')[0]) - 1 )]+")" + " (" + myPravila[int(keys['output'][a])].split('_')[1] +")\n")
                    else:
                        print(str(myPravila[int(keys['output'][a])].split('_')[0]) +'_'+ myPravila[int(keys['output'][a])].split('_')[1])

    else :
        for i in range(0, levelsObr):
            for y in range(0,len(keys[str(i+1)])):
                tm[keys[str(i+1)][y]]=TermMnogestvo(keys[str(i+1)][y])
        for i in range(0,len(keys['output'])):
            tm[keys['output'][i]]=TermMnogestvo(keys['output'][i])
        for i in range (0,len(keys['output'])):
            if(isWithComments):
                print(tm[keys['output'][i]].label+"("+tm[keys['output'][i]].termsName[(int(myPravila[int(keys['output'][i])].split('_')[0]) - 1 )]+")" + "(" + myPravila[int(keys['output'][i])].split('_')[1]+')\n')
            else:
#                 print("hi")
                return [myPravila[int(keys['output'][i])].split('_')[0],myPravila[int(keys['output'][i])].split('_')[1]]
                #print(str(myPravila[int(keys['output'][i])].split('_')[0])+'_' + str(myPravila[int(keys['output'][i])].split('_')[1]))


def get_cmap(n, name='hsv'):
    return plt.cm.get_cmap(name, n)
def Combinefunc(*args):
    return ['__'.join(i) for i in product(*args)]

def GetMinKoeffInputLevel(positionTM, value, input):
    
    obsh = []
    x = input
    archive = []
    
    for i in range(0, len(input)):       
        if len(input[i].get_data()[0]) == 1  :
            if input[i].get_data()[0][0] == float(value):
                archive.append(1.)
            else: archive.append(0.)
        else: archive.append(np.interp((value),input[i].get_data()[0], input[i].get_data()[1])) 
    obsh.append(max(archive))
    maxi = archive[0]
    position = 0
    dublicat = {}
    dublArr = []
    for i in range(len(archive)):
        if archive[i]>=maxi: 
            maxi=archive[i]
            position=i
            dublicat[i+1] = archive[i]
            dublArr.append(archive[i])  
    dublicatTemp = {}
    # проверить на повторение максимального значения
    for i in dublicat.keys():
        if(   dublicat[i] == dublArr[len(dublArr) - 1]   ):
            dublicatTemp[i] = dublicat[i]            
    myPravila[int(positionTM)] = str(position+1)+"_"+str(maxi)
    #print(myPravila)
    if( len(dublicatTemp.keys()) > 1 ):
        ttext = 'TM(' + str(positionTM)+') ==> some variants('+ str(len(dublicatTemp.keys()))+') = '+ str(dublicatTemp) + '\n'
       

        if(isWithComments):
            print( ttext)#.encode('utf8')
        if(not(positionTM  in myPravila2)):
            myPravila2[int(positionTM)] = []
        for i in dublicatTemp.keys():            
            myPravila2[int(positionTM)].append( str(i)+"_"+str(dublicatTemp[i]))


class TermMnogestvo:        
    def __init__(self,termMnogPosition):
        self.id = 'default_id'
        self.label = 'default_label'
        self.termsCount = 'default_termCount'
        self.termsName = []
        self.edIzm = 'default'
        self.comments = 'default'
        self.coord = dict([])
        self.level = 'none'
        self.fromNode = []
        self.pravila =dict([])
        self.outValue = ''
        self.id = int(TMs[int(termMnogPosition)-1].find('id').text)+1
        if(keys['input'].__contains__(termMnogPosition)):
            self.level = 'inp_0'
        if(keys['output'].__contains__(termMnogPosition)):
            self.level = 'out_0'
        for i in range(0, levelsObr):
            if(keys[str(i+1)].__contains__(termMnogPosition)):
                self.level = "o_"+str(i+1)        
        for i in range(len(Edges)): 
            if(Edges[i].find('to').text == termMnogPosition):
                self.fromNode.append(int(TMs[int(Edges[i].find('from').text)-1][0].text)+1)
        if (self.level != 'inp_0'):            
            for i in range(0, len(Pravila)):
                if (re.findall(r'\d+', Pravila[i].tag)[0] == str(termMnogPosition)):
                    self.pravila[Pravila[i].text.split('...')[0]] = Pravila[i].text.split('...')[1]     
        #запрос к правилам
        zapros = ''
        koeff = []
        if(self.level!= 'inp_0'):
            for i in range(len(self.fromNode)):
                zapros+=str(myPravila[self.fromNode[i]].split('_')[0])
                koeff.append(myPravila[self.fromNode[i]].split('_')[1])
                if((i+1) < len(self.fromNode)):
                    zapros+="_"
            self.outValue = self.pravila[zapros]
            myPravila[int(termMnogPosition)] = ""+str(self.outValue.split('_')[0])+'_'+str(float(self.outValue.split('_')[1]) *  float(min(koeff)))            
       #матрциа смежности
        self.adjMatrix = [1,1]
        #матрциа правил
        self.dictRules = []     
        self.label = TMs[int(termMnogPosition)-1].find('name').text
        self.termsCount = TMs[int(termMnogPosition) - 1].find('termsCount').text  
        for i in range(int(self.termsCount)):
            self.termsName.append(TMs[int(termMnogPosition) - 1]
                                    .find('termsNames')
                                    .find('term'+str(i+1)).text)
            #Сохранение координат графиков
        coords = TMs[int(termMnogPosition)-1].findall('coords')
        iksy_1 = []
        ygriki_1 = []
        for i in range(0, len(coords)):
            iksy_1 = []
            ygriki_1 = []
            for j in range(0, len(coords[i])):
                if re.findall(r'[a-zA-Z]+', coords[i][j].tag)[0] == 'x': 
                    iksy_1.insert(len(iksy_1),float(coords[i][j].text) )
                if re.findall(r'[a-zA-Z]+', coords[i][j].tag)[0] == 'y': 
                    ygriki_1.insert(len(ygriki_1),float(coords[i][j].text) )
            self.coord['x'+str(i+1)] = tuple(iksy_1)
            self.coord['y'+str(i+1)] = tuple(ygriki_1)
        pass
    
    
startModelling(fileName,inputValues, isWithComments, 2)