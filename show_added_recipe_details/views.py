import json
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
from .helpers import send_forget_password_mail
from .views import *
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import base64




def addedrecipe_view(request):
    if request.user.is_anonymous:
        return redirect("/")
    owner = request.GET.get('param1', '')
    recipename = request.GET.get('param2', '')
    mealtime = request.GET.get('param3', '')
    category = request.GET.get('param4', '')
    recipetime = request.GET.get('param5', '')
    ingredients = request.GET.get('param6', '')
    instrctions = request.GET.get('param7','')

    # padding = '=' * (len(instructions) % 4)
    # instructions += padding
    # ingredients += padding

    # # Decode base64 strings
    # try:
    #     instructions = base64.b64decode(instructions).decode('utf-8')
    #     ingredients = base64.b64decode(ingredients).decode('utf-8')
    # except base64.binascii.Error as e:
    #     # Handle decoding error, e.g., incorrect padding
    #     messages.error(request, f"Error decoding base64: {e}")
    #     return redirect('/myshoeRecipe')

    # instrctions = base64.b64decode(instrctions).decode('utf-8')
    # ingredients = base64.b64decode(ingredients).decode('utf-8')
    # Your processing logic goes here
    
    context = {
        'owner': owner,
        'recipename': recipename,
        'mealtime': mealtime,
        'category': category,
        'recipetime': recipetime,
        'ingredients': ingredients,
        'instrctions': instrctions,
    }
    messages.success(request, "Recipe viewed successfully!!")
    return render(request, 'myshowRecipe.html', context)