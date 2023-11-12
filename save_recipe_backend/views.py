from django.shortcuts import render,HttpResponse,redirect,get_object_or_404
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from naivebaker_app.models import Contact,Recipe
from datetime import datetime
from django.core.mail import send_mail
from django.conf import settings
from django.core import mail
from django.core.mail.message import EmailMessage
from django.contrib.auth.decorators import login_required
from .models import *
from .views import *
import base64


def home_view(request):
    imageurl = request.GET.get('param1', '')
    recipename = request.GET.get('param2', '')
    cusinetype = request.GET.get('param3', '')
    meal_time = request.GET.get('param4', '')
    prep_time = request.GET.get('param5', '')
    cooklink = request.GET.get('param6', '')

    imageurl = base64.b64decode(imageurl).decode('utf-8')
    # Your processing logic goes here
    savedone = save_recipe()
    savedone.user =   request.user
    savedone.recipename = recipename
    savedone.image = imageurl
    savedone.cusinetype = cusinetype
    savedone.meal_time = meal_time
    savedone.preptime = prep_time
    savedone.cooklink = cooklink
    savedone.save()
    messages.success(request, "Recipe is added successfully!!")
    return redirect('/home')
    # return HttpResponse(f'param1: {imageurl}, param2: {recipename},param3:{cusinetype},param4:{meal_time},,param5:{prep_time},param6:{cooklink}')
