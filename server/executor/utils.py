LANGUAGES = {
    "go": "Go", # Done 
    "js": "JavaScript", # Done 
    "py": "Python", # Done 
    "cpp": "C++", # Done 
    "c": "C", # Done 
    "rs": "Rust", # Done 
    "java": "Java", # Done 
    "cs": "C#" # Done 
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
