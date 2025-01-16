import random

def guessing_game():

    print("I am thinking of a number (between 0 and 100). Guess the number!\n")
    number = random.randint(0, 100)
    attempts = 0

    while True:
        try:
            guess = int(input("Your guess: "))
            attempts +=1
            if guess < number:
                print("Guess higher")
            elif guess > number:
                print("Guess lower")
            else:
                print(f"Correct! You guessed in {attempts} tries!")
                break
        except:
            print("Enter a valid integer.")

    play_again = input("Do you want to play again? (y/n): ").lower()
    if play_again == 'y':
        guessing_game()

guessing_game()