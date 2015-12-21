# -*- coding: utf-8 -*-
#django level
from django.shortcuts import render
from django.db import connections
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
#python level
import geojson
import json
import pymongo

# Create your views here.

def post_list(request):
    return render(request,'nonrelblog/post_list.html',{})
	
def leaflet(request):
    return render(request,'nonrelblog/leaflet.html',{})	
	
def homePage(request):
    return render(request,'nonrelblog/homePage.html',{})

def mainPage(request):
    return render(request,'nonrelblog/mainPage.html',locals())

def unite(request):
    return render(request,'nonrelblog/unite.html',locals())

def hotNews(request):
	return render(request,'nonrelblog/hotNews.html',locals())

def hotMap(request):
    return render(request,'nonrelblog/hotMap.html',locals())
	

def ajax(request):
    database = connections['default']
    db = database.get_collection('taipeiScore').find_one({'_id':'111111'})['111111']
    taipei = geojson.dumps(db)
    return HttpResponse(taipei, content_type = "application/json")
	
def Taipeiedge(request):
	database = connections['default']
	db2 = database.get_collection('taipeiedge').find_one({},{'_id': False})
	taipeiedge = geojson.dumps(db2)
	return HttpResponse(taipeiedge, content_type = "application/json")

def locPoint(request,id):
	locid = str(id)
	print locid
	database = connections['default']
	db = database.get_collection('loc')
	locdata = db.find_one({'_id':locid})[locid]
	locjson = geojson.dumps(locdata)
	return HttpResponse(locjson, content_type = "application/json")

@csrf_exempt
def changeScore(request):
	if request.method == 'POST':
		scoreorder = request.POST.get('scoreorder')
		print scoreorder
		database = connections['default']
		db = database.get_collection('taipeiScore').find_one({'_id':scoreorder})[scoreorder]
		taipei = geojson.dumps(db)
		return HttpResponse(taipei, content_type = "application/json")
	

# def getnews(request,area):
    
@csrf_exempt
def getnews(request):
    if request.method == 'POST':
		post_text = request.POST.get('area')
		print post_text
		database = connections['default']
		db = database.get_collection('ptt').find({"area":post_text.encode('utf-8')},{'_id': False})
		ad = db.sort('positive', pymongo.DESCENDING).limit(5)
		article = {"1":'',"2":'',"3":'',"4":'',"5":''}
		count = 1
		for ele in ad:	
			article[str(count)] = ele	
			count = count + 1
		#atd = json.dumps(article)
		count = 1
		db1 = database.get_collection('apl').find({"area":post_text.encode('utf-8')},{'_id': False})
		apl = db1.sort('like', pymongo.DESCENDING).limit(3)
		artap = {"1":'',"2":'',"3":''}
		for ele in apl:
			artap[str(count)] = ele
			count = count + 1
		count = 1
			
		db2 = database.get_collection('cht').find({"area":post_text.encode('utf-8')},{'_id': False})
		cht = db2.sort('like', pymongo.DESCENDING).limit(2)
		artch = {"1":'',"2":''}
		for ele in cht:
			artch[str(count)] = ele
			count = count + 1
		marti = {'cht':artch,'apl':artap,'ptt':article}
		artiData = json.dumps(marti)
		return HttpResponse(artiData, content_type = "application/json")	

		
	
	
	

# pymongo not interface from mongodjangoengine
# client = MongoClient('localhost', 27017)
# db = client.users.school.find_one()
# db.pop('_id')
# school = geojson.dumps(db)
# client.close()







	
	
	

	
