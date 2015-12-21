# 25.1970801041 >  25.210 & 25.212 > 25.1970801041 (left know and done)
# grep the edge grid and use row collect the grid

grid = read.csv("E:\\bitbucket\\dataclean\\test.csv")
taipeiedge = read.csv("E:\\bitbucket\\dataclean\\taipei.csv")
vec = as.numeric(c())
for (i in 1:nrow(grid)){
  a = grid$lat1[i] < taipeiedge$lat & taipeiedge$lat < grid$lat4[i]
  b = grid$log1[i] < taipeiedge$log & taipeiedge$log < grid$log4[i]
  true1 = which(a)
  true2 = which(b)
  edge = any(true1 %in% true2)
  if (edge==TRUE){
      vec = c(vec, i)
  }
}
#edge grid
edgegrid = grid[vec,]

#test
'''
edgegrid$marklat = (edgegrid$lat1+edgegrid$lat4)/2
edgegrid$marklog = (edgegrid$log1+edgegrid$log4)/2
'''
write.csv(edgegrid,"edgegrid.csv")

#next to select same row min(col) : max(col) between
taipeigrid = data.frame()
for (i in 1 :124) {
    x = subset(edgegrid,row ==i)
    y = subset(grid,row == i)
    selectrow = subset(y, min(x$col)<=col&col<=max(x$col))
    taipeigrid = rbind(taipeigrid,selectrow)
}

write.csv(taipeigrid,"E:\\bitbucket\\dataclean\\taipeigrid\\realtaipeigrid.csv")




