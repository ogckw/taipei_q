#riverside_park
library(dplyr)
library(data.table)
library(stringr)
library(plyr)
path = "E:\\bitbucket\\data_defination\\taipeigridF.csv"
taipei = fread(path,encoding="UTF-8")
path1 = "E:\\bitbucket\\data_defination\\parklocation.csv"
data1 = readLines(path1) 
data1 = iconv(data1, "utf8","utf8")
#extract number
riverside = unique(na.omit(as.numeric(unlist(strsplit(unlist(data1), "[^0-9]+")))))

path2 = "E:\\bitbucket\\data_defination\\taipeigridF.csv"
taipei = readLines(path2) %>% iconv("utf8","utf8") 
taipei= read.csv(textConnection(taipei),encoding='utf8')

#taipei$riverside = 0
#taipei[riverside,]$riverside = 2
hi = taipei[riverside,]
riverrange = data.frame(NULL)


for (i in 1:nrow(hi)){
    a = c(hi[i,10]+1,hi[i,11]+1)
    b = c(hi[i,10],hi[i,11]+1)
    c = c(hi[i,10]-1,hi[i,11]+1)
    d = c(hi[i,10]+1,hi[i,11])
    e = c(hi[i,10]-1,hi[i,11])
    f = c(hi[i,10]+1,hi[i,11]-1)
    g = c(hi[i,10],hi[i,11]-1)
    h = c(hi[i,10]-1,hi[i,11]-1)
    riverrange = rbind(riverrange,a,b,c,d,e,f,g,h)
}


colnames(riverrange) = c("row","col")

okrow = riverrange[!duplicated(riverrange),]
okrow$rivernear=1
taipei = left_join(taipei,okrow,by=c("row" = "row", "col" = "col"))
taipei[riverside,]$rivernear = 2

summary(taipei)
taipei[is.na(taipei)] = 0 

write.csv(taipei,"E:\\bitbucket\\data_defination\\riversidepark_Score.csv",row.names = FALSE)








