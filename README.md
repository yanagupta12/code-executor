# CODER
Coder is a code sandbox to run code snippet. It run the code and generates result as per the code provided. It supports major programming languages like C, C++, Python, Java, Go, Rust, JavaScript. To run the code of the language requirements should be installed on the system. 


## LOGO
![logo](https://github.com/Yana-Gupta/code-executor/assets/103108630/ffaa9ec3-878b-41fa-9e5c-028145c293b6)


## Features:
  1. **Login / SignUp** - User can login and signup on the ide. Login / SignUp Modal are present on the home screen.
  2. **Code Editor** - User can play with the code editor by clicking on the **Editor** button present on the top of the screen.
  3. **Change Credentials** - Once logged in user is also able to change his credentials.


## Code Editor
  1. Multiple Language Support and Syntax Highlighting - The IDE has a support of 8 languages [ C, C++, Golang, C#, JavaScript, Java, Python, Rust ].
  2. Theme - There are two theme options available [ Light / Dark ] on the right side of the top of the screen.
  3. Output - The output is generated based on the input user have provided.
  4. Code Execution - Execution of the code by clicking on running the code button.


## Login / SignUp and changing credentials 
  1. The user can login or signup with the Modal present on the home screen.
  2. To change credentials user can click on his profile button and select profile option.


## Screenshots of the website

  1. Home Page 
![image](https://github.com/Yana-Gupta/code-executor/assets/103108630/0819ae84-5d2b-47cf-88c6-cf5fcfefe44d)
  2. Editor
     
     Snapshot 1
     
     ![image](https://github.com/Yana-Gupta/code-executor/assets/103108630/9f0a0430-bd36-40b5-81da-3f37c72a41b3)
     Snapshot 2
     
     ![image](https://github.com/Yana-Gupta/code-executor/assets/103108630/dba59267-307f-482e-8490-01d2c401cc47)


## Tech Stack

1. Django
2. Vite tool for react
3. TypeScript
4. Sqlite database


## Run in local Environment 

  1. Backend
     
     i. cd to server directory
     ```
     cd server
     ```
     ii. Install the requirements
     ```
     pip install -r requirements.txt
     ```
     iii. Run the project
     ```
     python3 manage.py runserver
     ```
     The backend server will start at http://localhost:8000/
     
  2. Frontend
     
     i. cd to client directory
     ```
     cd client
     ```
     ii. Install dependencies
     ```
     npm i
     ```
     iii. Run the project
     ```
     npm run dev
     ```
     The frontend server will start at http://localhost:5173/
     

