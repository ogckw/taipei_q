library(XML)
data <- readLines("E:\\bitbucket\\dataclean\\data\\parking1.xml") 
data <- iconv(data, "BIG5","utf8")
doc = xmlParse(data,encoding='utf8')
dd = xmlToDataFrame(getNodeSet(doc, "//PARK"))
write.csv(dd,file = "E:\\bitbucket\\dataclean\\parking1.csv",fileEncoding = "utf-8",row.names = FALSE)


