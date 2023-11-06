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


def addRecipe(request) :
    # if request.user.is_anonymous:
    #     return redirect("/login")
    if request.method == "POST":

        recipe = Recipe()
        recipe.name = request.POST.get('recipeName')
        recipe.ingredients = request.POST.get('list_of_ingre')
        recipe.instructions = request.POST.get('steps')
        recipe.recipe_time = request.POST.get('recipeTime')
        recipe.vegitarity = request.POST.get('vegitarity')
        recipe.category = request.POST.get('category')
        recipe.meal_time = request.POST.get('mealtime')
        recipe.owner = request.user
        if len(request.FILES) != 0:
            recipe.image = request.FILES['image']
        recipe.save()
        messages.success(request, "Recipe is added successfully!!!")
        redirect('/addRecipe')

    return render(request,'addRecipe.html')