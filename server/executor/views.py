from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import tempfile
import subprocess
import json
from . import utils
import os


ALL_LANGUAGES = utils.LANGUAGES
ALL_BUILD_COMMANDS = utils.BUILD_COMMANDS


@csrf_exempt
def get_languages(request):
    if request.method == "GET":
        return JsonResponse(ALL_LANGUAGES, status=200)


@csrf_exempt
def compile_language(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            language_code = json_data.get("language_code")
            source_code = json_data.get("source_code")
            
            if language_code not in ALL_LANGUAGES.keys():
                return HttpResponse(f"language code {language_code} not supported", status=400)
            
            if language_code:
                temp_dir = tempfile.mkdtemp()
                code_file_path = os.path.join(temp_dir, f"main.{language_code}")
                with open(code_file_path, "w") as code_file:
                    code_file.write(source_code)
                    
                if language_code == "py": # Production not done
                    build_command = ALL_BUILD_COMMANDS[language_code]
                    process = subprocess.Popen(build_command, cwd=temp_dir, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
                    stdout, stderr = process.communicate()
                    return JsonResponse({'result': stdout, 'error': stderr}, status=200)
                
                
                if language_code == "js":
                    process = subprocess.Popen(["node", "main.js"], cwd=temp_dir, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
                    stdout, stderr = process.communicate()
                    return JsonResponse({'result': stdout, 'error': stderr}, status=200)
                                  
               
                
                if language_code == "java": # Production not done 
                    build_command = ALL_BUILD_COMMANDS[language_code]                        
                    subprocess.run(build_command, cwd=temp_dir, stderr=subprocess.STDOUT, check=True)
                    process = subprocess.Popen(build_command, cwd=temp_dir, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
                    executable_path = os.path.join(temp_dir, "main")
                    result = subprocess.check_output(["java", "main"], cwd=temp_dir, stderr=subprocess.STDOUT, text=True)
                    error = process.stderr.read().decode('utf-8')
                    return JsonResponse({'result': result, 'error': error}, status=200)
                
                
                if language_code == "cpp" or language_code == "c" or language_code == "rs":
                    build_command = ALL_BUILD_COMMANDS.get(language_code)  # Use .get() to avoid KeyError
                    error = ""
                    result = ""

                    try:
                        build_process = subprocess.run(build_command, cwd=temp_dir, stderr=subprocess.STDOUT, stdout=subprocess.PIPE, text=True, check=True)
                        executable_path = os.path.join(temp_dir, "main")
                        result = subprocess.check_output([executable_path], stderr=subprocess.STDOUT, text=True)
                    except subprocess.CalledProcessError as e:
                        error = e.stdout 
                    except Exception as e:
                        error = str(e)
                        
                    return JsonResponse({'result': result, 'error': error}, status=200)

                
            else: 
                return HttpResponse("unsupported language", status=400)        
        except Exception as e:
            return HttpResponse(f"e {e}", status=400)
        