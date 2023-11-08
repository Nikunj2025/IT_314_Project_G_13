from django.shortcuts import render
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

# Create your views here.
def index(request) :
    return render(request,'index.html')

def myshowRecipe(request) :
    if request.method == "POST" :
        owner = request.user
        print(owner)
        return redirect('/addRecipe')

    return render(request,'myshowRecipe.html')

def viewlogin(request) :
    if request.method == "POST" :
        uname = request.POST.get("username")
        pass1 = request.POST.get("pass")
        myuser = authenticate(username = uname,password = pass1)

        if myuser is not None :
            login(request,myuser)
            messages.success(request,"Logged In Successfully")
            return redirect('/home')
        else :
            messages.error(request,"Invalid Credentials")
            return redirect('/login')

    return render(request,'login.html')

def signup(request) :
    
        if request.method == "POST" :
            uname = request.POST.get("username")
            email = request.POST.get("email")
            password = request.POST.get("password1")
            confirmpassword = request.POST.get("password2")

            if password != confirmpassword :
                messages.warning(request,"Password is Incorrect") 
                return redirect('/signup')
            
            try : 
                 if User.objects.get(username=uname):
                    messages.info(request,'UserName is Taken')
                    return redirect('/signup')
            except :
                 pass
            try : 
                 if User.objects.get(email=email):
                    messages.info(request,'Email is Taken')
                    return redirect('/signup')
            except :
                 pass

            myuser = User.objects.create_user(uname,email,password)
            myuser.save()
            profile_obj = Profile.objects.create(user = myuser )
            profile_obj.save()
            messages.info(request,'Sign Up is Done Successfully,Please Login')
            return redirect('/signup')
        return render(request,'signup.html')
