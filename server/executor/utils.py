LANGUAGES = {
    "go": "Go",
    "js": "JavaScript",
    "python": "Python",
    "cpp": "C++",
    "c": "C",
    "rust": "Rust",
    "java": "Java",
    "csharp": "C#"
}


BUILD_COMMANDS = {
    "go": "go build -o main {filename}",
    "js": "node {filename}",
    "python": "python3 {filename}",
    "cpp": "g++ -o {filename} {filename}",
    "c": "gcc -o {filename} {filename}",
    "rust": "rustc {filename}",
    "java": "javac {filename}",
    "csharp": "mcs {filename}"
}

DOCKER_IMAGES = {
    "go": "golang:1.15.6",
    "js": "node:15.5.1",
    "python": "python:3.9.1",
    "cpp": "gcc:10.2.0",
    "c": "gcc:10.2.0",
    "rust": "rust:1.49.0",
    "java": "openjdk:15.0.1",
    "csharp": "mono:slim",
}


def get_language_name(language_code):
    return LANGUAGES.get(language_code, None)