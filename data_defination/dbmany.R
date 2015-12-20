library(dplyr)
library(data.table)
library(stringr)
path = "E:\\bitbucket\\testdata\\"
c = list.files(path,pattern="*.csv")
d=dir(path,pattern="*.csv")
data= data.table(NULL)
for (i in d){
    filepath = str_c(path,i)
    data = rbind(data,fread(paste(filepath),encoding="UTF-8"))
}

data$time=data$time%>%as.character(.)%>%strptime(.,format="%Y-%m-%d %H:")%>%as.POSIXct(.)

dd=data%>%mutate(date=substr(time,1,10))
dd$date=dd$date%>%as.character(.)%>%strptime(.,format="%Y-%m-%d")%>%as.POSIXct(.)
dd=dd%>%mutate(weekday=weekdays(date))
dd$time=dd$time%>%as.character(.)%>%strptime(.,format="%Y-%m-%d %H:")%>%as.POSIXct(.)
week = group_by(dd, pk,time) %>% do(data.frame(hrtotalvol = sum(.$totalvol),avgsp=mean(.$avgspeed))) 
#wednesday>thursday

#RLS-90 距音源 25 公尺、離地表 4 公尺高處之音壓位準
#L25 = 37.3+10*log10(m) 
l25=37.3+10*log10((week$hrtotalvol+1))
lcar = 27.7+10*log10(1+(0.02*week$avgsp)^3)
dv = lcar - 37.3
lm = dv+l25
summary(lm)
db = lm
week$env_1 =db
##night db
#wednesday>thursday
compare1=as.POSIXct(strptime("2015-11-18 22:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-19 08:00:00", "%Y-%m-%d %H:%M:%S"))
night3=subset(week,compare1<=time&time<compare2)
nightmean3=night3%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))

#thursday>friday
compare1=as.POSIXct(strptime("2015-11-19 22:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-20 08:00:00", "%Y-%m-%d %H:%M:%S"))
night4=subset(week,compare1<=time&time<compare2)
nightmean4=night4%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))

#friday>saturday
compare1=as.POSIXct(strptime("2015-11-20 22:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-21 08:00:00", "%Y-%m-%d %H:%M:%S"))
night5=subset(week,compare1<=time&time<compare2)
nightmean5=night5%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))

#saturday>sunday
compare1=as.POSIXct(strptime("2015-11-21 22:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-22 08:00:00", "%Y-%m-%d %H:%M:%S"))
night6=subset(week,compare1<=time&time<compare2)
nightmean6=night6%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))


#sunday>monday
compare1=as.POSIXct(strptime("2015-11-22 22:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-23 08:00:00", "%Y-%m-%d %H:%M:%S"))
night7=subset(week,compare1<=time&time<compare2)
nightmean7=night7%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))

#monday>tuesday
compare1=as.POSIXct(strptime("2015-11-23 22:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-24 08:00:00", "%Y-%m-%d %H:%M:%S"))
night1=subset(week,compare1<=time&time<compare2)
nightmean1=night1%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))


#tuesday>wednesday
compare1=as.POSIXct(strptime("2015-11-24 22:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-25 08:00:00", "%Y-%m-%d %H:%M:%S"))
night2=subset(week,compare1<=time&time<compare2)
nightmean2=night2%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))


#daylightdb
#thursday

compare1=as.POSIXct(strptime("2015-11-19 08:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-19 22:00:00", "%Y-%m-%d %H:%M:%S"))
night4=subset(week,compare1<=time&time<compare2)
nightmean4=night4%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))

#friday
compare1=as.POSIXct(strptime("2015-11-20 08:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-20 22:00:00", "%Y-%m-%d %H:%M:%S"))
night5=subset(week,compare1<=time&time<compare2)
nightmean5=night5%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))

#saturday

compare1=as.POSIXct(strptime("2015-11-21 08:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-21 22:00:00", "%Y-%m-%d %H:%M:%S"))
night6=subset(week,compare1<=time&time<compare2)
nightmean6=night6%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))


#sunday
compare1=as.POSIXct(strptime("2015-11-22 08:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-22 22:00:00", "%Y-%m-%d %H:%M:%S"))
night7=subset(week,compare1<=time&time<compare2)
nightmean7=night7%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))

#monday
compare1=as.POSIXct(strptime("2015-11-23 08:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-23 22:00:00", "%Y-%m-%d %H:%M:%S"))
night1=subset(week,compare1<=time&time<compare2)
nightmean1=night1%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))

#tuesday
compare1=as.POSIXct(strptime("2015-11-24 08:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-24 22:00:00", "%Y-%m-%d %H:%M:%S"))
night2=subset(week,compare1<=time&time<compare2)
nightmean2=night2%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))

#wednesday
compare1=as.POSIXct(strptime("2015-11-25 08:00:00", "%Y-%m-%d %H:%M:%S"))
compare2=as.POSIXct(strptime("2015-11-25 22:00:00", "%Y-%m-%d %H:%M:%S"))
night3=subset(week,compare1<=time&time<compare2)
nightmean3=night3%>%group_by(pk)%>%do(data.frame(dbmean=mean(.$env_1)))






##VDmap
pp=dd[,c("pk","lat","lon"),with=FALSE]
k=!duplicated(pp$pk)
vdmap=pp[k,]
rm(pp)

dbmap=full_join(vdmap,nightmean1)
dbmap=full_join(dbmap,nightmean2,by="pk")
dbmap = full_join(dbmap,nightmean3,by="pk")
dbmap = full_join(dbmap,nightmean4,by="pk")
dbmap = full_join(dbmap,nightmean5,by="pk")
dbmap = full_join(dbmap,nightmean6,by="pk")
dbmap = full_join(dbmap,nightmean7,by="pk")

#for cartodb

dbmapcarto=full_join(week,vdmap)

write.csv(dbmapcarto,"E:\\bitbucket\\data_defination\\dbmapcarto.csv",row.names = FALSE)



meandb=rowMeans(dbmap[,4:10],na.rm = TRUE)

dbmap$env_1=meandb

dbmap1=dbmap[,c("pk","lat","lon","env_1")]
dbmap1 = dbmap1[!is.na(dbmap1$env_1),]

path = "E:\\bitbucket\\data_defination\\taipeigridF.csv"

taipei = fread(path,encoding="UTF-8")
taipei$env_1=0

for (i in 1:nrow(taipei)){
    a = taipei$lat1[i] < dbmap1$lat & dbmap1$lat < taipei$lat4[i]
    b = taipei$log1[i] < dbmap1$lon & dbmap1$lon < taipei$log4[i]
    true1 = which(a)
    true2 = which(b)
    total = sum(true1 %in% true2)
    point = c(true1,true2) 
    pointIn= point[duplicated(point)]
    if (total>0){
        taipei[i,]$env_1=mean(dbmap1[pointIn,]$env_1)
    }
}
summary(taipei$env_1)
taipei[taipei$env_1==0,]$env_1=13.88

#output
write.csv(taipei,"E:\\bitbucket\\data_defination\\env_1_score_day.csv",row.names = FALSE)










