
# coding: utf-8
# myextension.py

import re
import pandas as pd
import geocoder
import time
import math

### 清理地址 : 擷取地址到 "號"
def AddressCleanNO(table,Idcol,addcol):    
    Id=[]    # Id
    addclean=[]    # 清理後 address
    for row in table.itertuples():
        m1 = re.search('([\x00-\xff]+?)號',str(row[addcol]))    #str(row[addcol])
        if m1:
            Id.append(row[Idcol])
            addclean.append(m1.group(1)+'號')
        else:
            Id.append(row[Idcol])
            addclean.append('NaN')
    add = pd.DataFrame.from_items([('Id', Id), ('AddressClean', addclean)])
    cleandata = pd.merge(table, add, how='left', on=['Id'])       
    return cleandata

### 清理地址 : 擷取地址到 "號", 去除區、里
def AddressCleanDist(table,Idcol,addcol):    
    Id=[]    # Id
    addclean=[]    # 清理後 address
    for row in table.itertuples():
        m1 = re.search('[\x00-\xff]+?區[\x00-\xff]+?里([\x00-\xff]+?)號',str(row[addcol]))    
        m2 = re.search('[\x00-\xff]+?區([\x00-\xff]+?)號',str(row[addcol]))
        m3 = re.search('[\x00-\xff]+?市([\x00-\xff]+?)號',str(row[addcol]))  
        if m1:
            Id.append(row[Idcol])
            addclean.append('台北市'+m1.group(1)+'號')
        elif m2:
            Id.append(row[Idcol])
            addclean.append('台北市'+m2.group(1)+'號')
        elif m3:
            Id.append(row[Idcol])
            addclean.append('台北市'+m3.group(1)+'號')              
        else:
            Id.append(row[Idcol])
            addclean.append('NaN')
    add = pd.DataFrame.from_items([('Id', Id), ('AddressClean', addclean)])
    cleandata = pd.merge(table, add, how='left', on=['Id'])       
    return cleandata

### 清理地址 : 補上"台北市" + 擷取至 號、弄、巷、段、路、街 (Non-greedy)
def AddressCleanSimple(table,Idcol,addcol):
    Id=[]    # Id
    addclean=[]    # 清理後 address
    for row in data.itertuples():    
        m1 = re.search('([\x00-\xff]+?)號', row[addcol].encode('utf8'))
        m2 = re.search('([\x00-\xff]+?)弄', row[addcol].encode('utf8'))
        m3 = re.search('([\x00-\xff]+?)巷', row[addcol].encode('utf8'))
        m4 = re.search('([\x00-\xff]+?)段', row[addcol].encode('utf8'))
        m5 = re.search('([\x00-\xff]+?)路', row[addcol].encode('utf8'))
        m6 = re.search('([\x00-\xff]+?)街', row[addcol].encode('utf8'))
        if m1:
            Id.append(row[Idcol])
            addclean.append('台北市'+ m1.group(1)+'號')
        elif m2:
            Id.append(row[Idcol])
            addclean.append('台北市'+ m2.group(1)+'弄')
        elif m3:
            Id.append(row[Idcol])
            addclean.append('台北市'+ m3.group(1)+'巷')
        elif m4:
            Id.append(row[Idcol])
            addclean.append('台北市'+ m4.group(1)+'段')
        elif m5:
            Id.append(row[Idcol])
            addclean.append('台北市'+ m5.group(1)+'路')
        elif m6:
            Id.append(row[Idcol])
            addclean.append('台北市'+ m6.group(1)+'街')               
        else:
            Id.append(row[Idcol])
            addclean.append('NaN')
    add = pd.DataFrame.from_items([('Id', Id), ('AddressClean', addclean)])      
    return add


### 清理地址 : 複雜的地址清理
def AddressCleanAdv(table,Idcol,Addcol):
    Id=[]    # Id
    add1=[]    # 清理後 address
    add2=[]
    add3=[]
    cnt=0
    for row in table.itertuples():
        # 中文字串、符號比對直接複製內容貼上...無法用'\'跳脫字元  
        # 編碼規則 : m(狀況)(組別)(比對)
        # 狀況 1 : 林森南路(仁愛路1段至羅斯福路1段) --> \) 半形
        m1 = re.search('([\x00-\xff]+?)\(([\x00-\xff]+)至([\x00-\xff]+)\)', row[Addcol].encode('utf8'))
        # 狀況 2 : 西昌街（桂林街以南、廣州街以北）--> ）全形
        m2 = re.search('([\x00-\xff]+?)（([\x00-\xff]+?)、([\x00-\xff]+?)）', row[Addcol].encode('utf8'))
        # 狀況 3 : 忠孝東路5段、虎林街口(忠孝東路5段455號)--> ）全形
        m3 = re.search('([\x00-\xff]+?)、([\x00-\xff]+?)\(([\x00-\xff]+)\)', row[Addcol].encode('utf8'))
        # 其他狀況 : 一般地址
        m4 = re.search('([\x00-\xff]+?)街口', row[Addcol].encode('utf8'))
        m5 = re.search('([\x00-\xff]+?)路口', row[Addcol].encode('utf8'))
        m6 = re.search('([\x00-\xff]+?)號', row[Addcol].encode('utf8'))
        m7 = re.search('([\x00-\xff]+?)弄', row[Addcol].encode('utf8'))
        m8 = re.search('([\x00-\xff]+?)巷', row[Addcol].encode('utf8'))
        m9 = re.search('([\x00-\xff]+?)段', row[Addcol].encode('utf8'))
        m10 = re.search('([\x00-\xff]+?)街', row[Addcol].encode('utf8'))
        m11 = re.search('([\x00-\xff]+?)路', row[Addcol].encode('utf8'))         
        cnt += 1
        ##################################################################
        if m1:
            # group(1) 清理地址:
            Id.append(row[Idcol])
            m111 = re.search('([\x00-\xff]+?)號', m1.group(1))
            m112 = re.search('([\x00-\xff]+?)弄', m1.group(1))
            m113 = re.search('([\x00-\xff]+?)巷', m1.group(1))
            m114 = re.search('([\x00-\xff]+?)街段', m1.group(1))
            m115 = re.search('([\x00-\xff]+?)路段', m1.group(1))                
            m116 = re.search('([\x00-\xff]+?)段', m1.group(1))
            m117 = re.search('([\x00-\xff]+?)街', m1.group(1))
            m118 = re.search('([\x00-\xff]+?)路', m1.group(1))      
            if m111:
                add1.append('台北市'+ m111.group(1)+'號')
            elif m112:
                add1.append('台北市'+ m112.group(1)+'弄')
            elif m113:
                add1.append('台北市'+ m113.group(1)+'巷')
            elif m114:
                add1.append('台北市'+ m114.group(1)+'街')
            elif m115:
                add1.append('台北市'+ m115.group(1)+'路')
            elif m116:
                add1.append('台北市'+ m116.group(1)+'段') 
            elif m117:
                add1.append('台北市'+ m117.group(1)+'街')
            elif m118:
                add1.append('台北市'+ m118.group(1)+'路')
            else:
                add1.append('NaN')   
            # group(2) 清理地址:
            m121 = re.search('([\x00-\xff]+?)號', m1.group(2))
            m122 = re.search('([\x00-\xff]+?)弄', m1.group(2))
            m123 = re.search('([\x00-\xff]+?)巷', m1.group(2))
            m124 = re.search('([\x00-\xff]+?)街段', m1.group(2))
            m125 = re.search('([\x00-\xff]+?)路段', m1.group(2))                
            m126 = re.search('([\x00-\xff]+?)段', m1.group(2))
            m127 = re.search('([\x00-\xff]+?)街', m1.group(2))
            m128 = re.search('([\x00-\xff]+?)路', m1.group(2))      
            if m121:
                add2.append(m121.group(1)+'號')
            elif m122:
                add2.append(m122.group(1)+'弄')
            elif m123:
                add2.append(m123.group(1)+'巷')
            elif m124:
                add2.append(m124.group(1)+'街')
            elif m125:
                add2.append(m125.group(1)+'路')
            elif m126:
                add2.append(m126.group(1)+'段') 
            elif m127:
                add2.append(m127.group(1)+'街')
            elif m128:
                add2.append(m128.group(1)+'路')
            else:
                add2.append('NaN')    
            # group(3) 清理地址:
            m131 = re.search('([\x00-\xff]+?)號', m1.group(3))
            m132 = re.search('([\x00-\xff]+?)弄', m1.group(3))
            m133 = re.search('([\x00-\xff]+?)巷', m1.group(3))
            m134 = re.search('([\x00-\xff]+?)街段', m1.group(3))
            m135 = re.search('([\x00-\xff]+?)路段', m1.group(3))                
            m136 = re.search('([\x00-\xff]+?)段', m1.group(3))
            m137 = re.search('([\x00-\xff]+?)街', m1.group(3))
            m138 = re.search('([\x00-\xff]+?)路', m1.group(3))      
            if m131:
                add3.append(m131.group(1)+'號')
            elif m132:
                add3.append(m132.group(1)+'弄')
            elif m133:
                add3.append(m133.group(1)+'巷')
            elif m134:
                add3.append(m134.group(1)+'街')
            elif m135:
                add3.append(m135.group(1)+'路')
            elif m136:
                add3.append(m136.group(1)+'段') 
            elif m137:
                add3.append(m137.group(1)+'街')
            elif m138:
                add3.append(m138.group(1)+'路')
            else:
                add3.append('NaN')
        ##################################################################        
        elif m2:
            Id.append(row[Idcol])
            m211 = re.search('([\x00-\xff]+?)號', m2.group(1))
            m212 = re.search('([\x00-\xff]+?)弄', m2.group(1))
            m213 = re.search('([\x00-\xff]+?)巷', m2.group(1))
            m214 = re.search('([\x00-\xff]+?)街段', m2.group(1))
            m215 = re.search('([\x00-\xff]+?)路段', m2.group(1))                
            m216 = re.search('([\x00-\xff]+?)段', m2.group(1))
            m217 = re.search('([\x00-\xff]+?)街', m2.group(1))
            m218 = re.search('([\x00-\xff]+?)路', m2.group(1))      
            if m211:
                add1.append('台北市'+ m211.group(1)+'號')
            elif m212:
                add1.append('台北市'+ m212.group(1)+'弄')
            elif m213:
                add1.append('台北市'+ m213.group(1)+'巷')
            elif m214:
                add1.append('台北市'+ m214.group(1)+'街')
            elif m215:
                add1.append('台北市'+ m215.group(1)+'路')
            elif m216:
                add1.append('台北市'+ m216.group(1)+'段') 
            elif m217:
                add1.append('台北市'+ m217.group(1)+'街')
            elif m218:
                add1.append('台北市'+ m218.group(1)+'路')
            else:
                add1.append('NaN')   
            # group(2) 清理地址:
            m221 = re.search('([\x00-\xff]+?)號', m2.group(2))
            m222 = re.search('([\x00-\xff]+?)弄', m2.group(2))
            m223 = re.search('([\x00-\xff]+?)巷', m2.group(2))
            m224 = re.search('([\x00-\xff]+?)街段', m2.group(2))
            m225 = re.search('([\x00-\xff]+?)路段', m2.group(2))                
            m226 = re.search('([\x00-\xff]+?)段', m2.group(2))
            m227 = re.search('([\x00-\xff]+?)街', m2.group(2))
            m228 = re.search('([\x00-\xff]+?)路', m2.group(2))      
            if m221:
                add2.append(m221.group(1)+'號')
            elif m222:
                add2.append(m222.group(1)+'弄')
            elif m223:
                add2.append(m223.group(1)+'巷')
            elif m224:
                add2.append(m224.group(1)+'街')
            elif m225:
                add2.append(m225.group(1)+'路')
            elif m226:
                add2.append(m226.group(1)+'段') 
            elif m227:
                add2.append(m227.group(1)+'街')
            elif m228:
                add2.append(m228.group(1)+'路')
            else:
                add2.append('NaN')    
            # group(3) 清理地址:
            m231 = re.search('([\x00-\xff]+?)號', m2.group(3))
            m232 = re.search('([\x00-\xff]+?)弄', m2.group(3))
            m233 = re.search('([\x00-\xff]+?)巷', m2.group(3))
            m234 = re.search('([\x00-\xff]+?)街段', m2.group(3))
            m235 = re.search('([\x00-\xff]+?)路段', m2.group(3))                
            m236 = re.search('([\x00-\xff]+?)段', m2.group(3))
            m237 = re.search('([\x00-\xff]+?)街', m2.group(3))
            m238 = re.search('([\x00-\xff]+?)路', m2.group(3))      
            if m231:
                add3.append(m231.group(1)+'號')
            elif m232:
                add3.append(m232.group(1)+'弄')
            elif m233:
                add3.append(m233.group(1)+'巷')
            elif m234:
                add3.append(m234.group(1)+'街')
            elif m235:
                add3.append(m235.group(1)+'路')
            elif m236:
                add3.append(m236.group(1)+'段') 
            elif m237:
                add3.append(m237.group(1)+'街')
            elif m238:
                add3.append(m238.group(1)+'路')
            else:
                add3.append('NaN')
        ##################################################################        
        elif m3:   
            Id.append(row[Idcol])
            m311 = re.search('([\x00-\xff]+?)號', m3.group(1))
            m312 = re.search('([\x00-\xff]+?)弄', m3.group(1))
            m313 = re.search('([\x00-\xff]+?)巷', m3.group(1))
            m314 = re.search('([\x00-\xff]+?)街段', m3.group(1))
            m315 = re.search('([\x00-\xff]+?)路段', m3.group(1))                
            m316 = re.search('([\x00-\xff]+?)段', m3.group(1))
            m317 = re.search('([\x00-\xff]+?)街', m3.group(1))
            m318 = re.search('([\x00-\xff]+?)路', m3.group(1))      
            if m311:
                add1.append('台北市'+ m311.group(1)+'號')
            elif m312:
                add1.append('台北市'+ m312.group(1)+'弄')
            elif m313:
                add1.append('台北市'+ m313.group(1)+'巷')
            elif m314:
                add1.append('台北市'+ m314.group(1)+'街')
            elif m315:
                add1.append('台北市'+ m315.group(1)+'路')
            elif m316:
                add1.append('台北市'+ m316.group(1)+'段') 
            elif m317:
                add1.append('台北市'+ m317.group(1)+'街')
            elif m318:
                add1.append('台北市'+ m318.group(1)+'路')
            else:
                add1.append('NaN')   
            # group(2) 清理地址:
            m321 = re.search('([\x00-\xff]+?)號', m3.group(2))
            m322 = re.search('([\x00-\xff]+?)弄', m3.group(2))
            m323 = re.search('([\x00-\xff]+?)巷', m3.group(2))
            m324 = re.search('([\x00-\xff]+?)街段', m3.group(2))
            m325 = re.search('([\x00-\xff]+?)路段', m3.group(2))                
            m326 = re.search('([\x00-\xff]+?)段', m3.group(2))
            m327 = re.search('([\x00-\xff]+?)街', m3.group(2))
            m328 = re.search('([\x00-\xff]+?)路', m3.group(2))      
            if m321:
                add2.append(m321.group(1)+'號')
            elif m322:
                add2.append(m322.group(1)+'弄')
            elif m323:
                add2.append(m323.group(1)+'巷')
            elif m324:
                add2.append(m324.group(1)+'街')
            elif m325:
                add2.append(m325.group(1)+'路')
            elif m326:
                add2.append(m326.group(1)+'段') 
            elif m327:
                add2.append(m327.group(1)+'街')
            elif m328:
                add2.append(m328.group(1)+'路')
            else:
                add2.append('NaN')    
            # group(3) 清理地址:
            m331 = re.search('([\x00-\xff]+?)號', m3.group(3))
            m332 = re.search('([\x00-\xff]+?)弄', m3.group(3))
            m333 = re.search('([\x00-\xff]+?)巷', m3.group(3))
            m334 = re.search('([\x00-\xff]+?)街段', m3.group(3))
            m335 = re.search('([\x00-\xff]+?)路段', m3.group(3))                
            m336 = re.search('([\x00-\xff]+?)段', m3.group(3))
            m337 = re.search('([\x00-\xff]+?)街', m3.group(3))
            m338 = re.search('([\x00-\xff]+?)路', m3.group(3))      
            if m331:
                add3.append(m331.group(1)+'號')
            elif m332:
                add3.append(m332.group(1)+'弄')
            elif m333:
                add3.append(m333.group(1)+'巷')
            elif m334:
                add3.append(m334.group(1)+'街')
            elif m335:
                add3.append(m335.group(1)+'路')
            elif m336:
                add3.append(m336.group(1)+'段') 
            elif m337:
                add3.append(m337.group(1)+'街')
            elif m338:
                add3.append(m338.group(1)+'路')
            else:
                add3.append('NaN')
        ##################################################################
        elif m4:
            add2.append('NaN')
            add3.append('NaN')
            Id.append(row[Idcol])
            add1.append('台北市'+ m4.group(1)+'街口')
        elif m5:
            add2.append('NaN')
            add3.append('NaN')
            Id.append(row[Idcol])
            add1.append('台北市'+ m5.group(1)+'路口')    
        elif m6:
            add2.append('NaN')
            add3.append('NaN')
            Id.append(row[Idcol])
            add1.append('台北市'+ m6.group(1)+'號')         
        elif m7:
            add2.append('NaN')
            add3.append('NaN')
            Id.append(row[Idcol])
            add1.append('台北市'+ m7.group(1)+'弄')
        elif m8:
            add2.append('NaN')
            add3.append('NaN')
            Id.append(row[Idcol])
            add1.append('台北市'+ m8.group(1)+'巷')         
        elif m9:
            add2.append('NaN')
            add3.append('NaN')
            Id.append(row[Idcol])
            add1.append('台北市'+ m9.group(1)+'段')       
        elif m10:
            add2.append('NaN')
            add3.append('NaN')
            Id.append(row[Idcol])
            add1.append('台北市'+ m10.group(1)+'街')         
        elif m11:
            add2.append('NaN')
            add3.append('NaN')
            Id.append(row[Idcol])
            add1.append('台北市'+ m11.group(1)+'路')                      
        
        else:                        
            Id.append(row[Idcol])
            add1.append('NaN')
            add2.append('NaN')  
            add3.append('NaN')   
    adds = pd.DataFrame.from_items([('Id', Id), ('add1', add1), ('add2', add2), ('add3', add3)])      
    return adds


### 接續 AddressCleanAdv : 排列組合地址 --> 以 id join , 注意有筆數膨脹的問題, index為PK
def AddCombine(adds,Idcol,Add1,Add2,Add3):
    Id=[]
    AddressClean=[]
    for row in adds.itertuples():
        if row[Add3] != 'NaN':
            Id.append(row[Idcol])
            AddressClean.append(row[Add1]+row[Add2])
            Id.append(row[Idcol])
            AddressClean.append(row[Add1]+row[Add3])
        elif row[Add2] != 'NaN':
            Id.append(row[Idcol])
            AddressClean.append(row[Add1]+row[Add2])
        else:
            Id.append(row[Idcol])
            AddressClean.append(row[Add1])
    addcomb = pd.DataFrame.from_items([('Id', Id), ('AddressClean', AddressClean)]) 
    return addcomb



### 有/無 2元轉換成 True/False 
def BinaryMap(table,Idcol,Bincol,rename):
    Id=[]
    Binary=[]
    for row in table.itertuples():
        if row[Bincol].encode('utf8') == '有':
            Id.append(row[Idcol])
            Binary.append('T')
        else:
            Id.append(row[Idcol])
            Binary.append('F')
    binary = pd.DataFrame.from_items([('Id', Id), (str(rename),Binary)])
    return binary 


### 地址轉換經緯度:
# geocoder 1.6.4
# pup install geocoder
def geocode(table,Idcol,Addcol):
    Id=[]
    Longitude = []    # 經度
    Latitude = []    # 緯度
    for row in table.itertuples():
        g = geocoder.google(row[Addcol].decode('utf-8'))
        print row[Addcol]
        print g
        print g.latlng    
        if str(g)  == '<[ZERO_RESULTS] Google - Geocode>':
            Id.append(row[Idcol])
            Latitude.append('Nan')    # 緯度
            Longitude.append('Nan')   # 經度
        else:
            Id.append(row[Idcol])
            Latitude.append(g.latlng[0])    # 緯度
            Longitude.append(g.latlng[1])   # 經度
        #time.sleep(1)
    geo = pd.DataFrame.from_items([('Id', Id), ('Longitude', Longitude), ('Latitude', Latitude)])
    cleandata = pd.merge(table, geo, how='left', on=['Id'])
    return cleandata

def cutFile(table,outname,path):
    for i in range(1,int(math.ceil(len(table.index)/2500.0))+1):
        filename = str(outname) + str(i)
        data = table.iloc[0+(i-1)*2500:i*2500,:]
        data.to_csv(str(path)+ filename +'.csv',encoding='utf8')
        print str(path)+ filename +'.csv'
        
def geoFor(Oldname,loop,Idcol,Addcol,Newname):
    for i in range(1,int(loop)+1):
        filename = Oldname + str(i)
        Outname = Newname + str(i)
        Outname = pd.read_csv('E:\\ZB103\\lifeQ\\RawData\\'+str(filename)+'.csv', skipinitialspace=True)
        print Outname
        data = geocode(Outname,Idcol,Addcol)
        data.to_csv('E:\\ZB103\\lifeQ\\CleanData\\'+ Newname + str(i) +'.csv',encoding='utf8')

def geoWrite(path,Idcol,Addcol,outpath):
        readfile = pd.read_csv(str(path), skipinitialspace=True)
        print readfile
        data = geocode(readfile,Idcol,Addcol)
        data.to_csv(str(outpath),encoding='utf8') 
        
def geoAppend(firstfilepath,path,name,loop):
    data = pd.read_csv(str(firstfilepath), skipinitialspace=True)
    for i in range(2,int(loop)+1):
        filename = name + str(i)
        add = pd.read_csv(str(path)+str(filename)+'.csv', skipinitialspace=True)
        result = data.append(add)
    return result