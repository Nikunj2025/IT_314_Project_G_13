from django.shortcuts import render

# Create your views here.
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
