import random

def rps():

    choices = ["rock", "paper", "scissors"]

    while True:
        player_choice = input("Let's play Rock, Paper, Scissors! Enter your choice: \n").lower()
        
        if player_choice not in choices:
            print("Invalid choice, try again.")
            continue

        computer_choice = random.choice(choices)
        print(f"Computer chose: {computer_choice}")

        win_conditions = [
            (player_choice == "rock" and computer_choice == "scissors"),
            (player_choice == "scissors" and computer_choice == "paper"),
            (player_choice == "paper" and computer_choice == "rock")
        ]

        if player_choice == computer_choice:
            print("It's a tie!")

        elif any(win_conditions):
            print("You win!")

        else:
            print("You lose!")

        play_again = input("Do you want to play again? (y/n): ").lower()
        if play_again == 'y':
            rps()
        
rps()