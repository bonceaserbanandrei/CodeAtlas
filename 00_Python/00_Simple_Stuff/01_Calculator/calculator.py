a,b = map(int,input("Insert your numbers: \n").split(","))
print("Choose desired operation:")
print("\n1.Addition")
print("\n2.Subtraction")
print("\n3.Multiplication")
print("\n4.Division\n")
choice = int(input("Your choice:"))
if choice == 1:
    print(f"Result : {a+b}")
elif choice == 2:
    print(f"Result : {a-b}")
elif choice == 3:
    print(f"Result : {a*b}")
elif choice == 4:
    print(f"Result : {a/b}")
else:
    print(f"No option available.")

