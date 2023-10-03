LANGUAGES = {
    "go": "go", # Done 
    "js": "javascript", # Done 
    "py": "python", # Done 
    "cpp": "cpp", # Done 
    "c": "c", # Done 
    "rs": "rust", # Done 
    "java": "java", # Done 
    "cs": "csharp" # Done 
}


BUILD_COMMANDS = {
    "cpp": ["g++", "-o", "main", "main.cpp"],
    "c": ["gcc", "-o", "main", "main.c"],
    "java": ["javac", "main.java"],
    "cs": ["csc", "/out:Main.exe", "Main.cs"],
    "go": ["go", "build", "main.go"],
    "rs": ["rustc", "-o", "main", "main.rs"],
    "py": ["python"]
}


def get_language_name(language_code):
    return LANGUAGES.get(language_code, None)
