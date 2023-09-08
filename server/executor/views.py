from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import tempfile
import docker
import json
from . import utils
import os


ALL_LANGUAGES = utils.LANGUAGES
ALL_BUILD_COMMANDS = utils.BUILD_COMMANDS
DOCKER_IMAGES = utils.DOCKER_IMAGES


@csrf_exempt
@login_required
def get_languages(request):
    # if request.method == "GET":
        return JsonResponse(ALL_LANGUAGES, status=200)


@csrf_exempt
@login_required
def compile_language(request):
    # if request.method == "POST":
        try:
            json_data = json.loads(request.body.decode('utf-8'))
            language_code = json_data.get("language_code")
            source_code = json_data.get("source_code")
            
            if language_code not in ALL_LANGUAGES.keys():
                return HttpResponse("language not supported", status=400)
            
            if language_code and source_code:
                temp_dir = tempfile.mkdtemp()
                print(f"main.{language_code}")
                code_file_path = os.path.join(temp_dir, f"main.{language_code}")
                with open(code_file_path, "w") as code_file:
                    code_file.write(source_code)
                    
                with open(code_file_path, "r") as code_file:
                    print(code_file.read())


                
                docker_client = docker.from_env()
                print(docker_client)
                print("docker client created")
                print(code_file_path)
                
                container = docker_client.containers.run(
                    DOCKER_IMAGES[language_code],
                    command=ALL_BUILD_COMMANDS[language_code].format(filename=code_file_path),
                    volumes={temp_dir: {'bind': '/app', 'mode': 'rw'}},
                    working_dir='/app',
                    stdout=True,
                    stderr=True,
                    remove=True,
                )
                
                print(container)
                print("container created")
                output = container.decode("utf-8")
                
                return JsonResponse({'output': output, 'error': ''})            
            else: 
                return HttpResponse("both language code and source code are required", status=400)        
        except Exception as e:
            return HttpResponse(f"e {e}", status=400)
