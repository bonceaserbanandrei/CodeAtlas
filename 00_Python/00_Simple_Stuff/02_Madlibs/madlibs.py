available_stories = [
    "The {} was happy to hear that the {} decided to not give up.",
    "{} did not, in fact, clean the {}, therefore his {} was upset with them.",
    "Every {}, {} like to go to the {} and {}."
]

print("Choose your story:\n")
print(f"1.{available_stories[0]}\n")
print(f"2.{available_stories[1]}\n")
print(f"3.{available_stories[2]}\n")

choice = int(input("Your choice: "))

if choice == 1:
    A,B = input("Insert 2 words to fill in the gaps: ").split(",")
    print(f"{available_stories[0].format(A,B)}")
elif choice == 2:
    A,B,C = input("Insert 3 words to fill in the gaps: ").split(",")
    print(f"{available_stories[1].format(A,B,C)}")
elif choice == 3:
    A,B,C,D = input("Insert 4 words to fill in the gaps: ").split(",")
    print(f"{available_stories[2].format(A,B,C,D)}")
else:
    print("No story available.")