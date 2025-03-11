import pygame  # Import pygame for audio playback
import tkinter as tk  # Import tkinter for GUI
from tkinter import filedialog  # Import filedialog to handle file/folder dialogs
import os  # Import os for file and folder operations
import threading
import time


class AudioPlayer:
    def __init__(self, root):
        """Initialize the Audio Player application."""
        self.root = root  # Store the root Tkinter window
        self.root.title("Audio Player")  # Set the window title
        self.playlist = []  # List to store audio file paths
        self.current_index = 0  # Track the index of the currently playing audio
        self.is_playing = False  # Boolean to track if audio is playing
        self.start_time = 0
        self.timer_thread = threading.Thread(target= self.timer_threading)
        self.is_changed = False

        pygame.mixer.init()  # Initialize pygame mixer for audio playback

        # Create GUI buttons for user interactions
        self.play_button = tk.Button(root, text="Play", command=self.play_audio, width=10,bg="green")
        self.next_button = tk.Button(root, text="Next", command=self.next_audio, width=10,bg="green")
        self.stop_button = tk.Button(root, text="Stop", command=self.stop_audio, width=10,bg="green")
        self.add_button = tk.Button(root, text="Add Folder", command=self.add_folder, width=10,bg="green")
       

        # Arrange buttons on the grid layout
        self.play_button.grid(row=0, column=0, padx=10, pady=10)  # Play button
        self.next_button.grid(row=0, column=1, padx=10, pady=10)  # Next button
        self.stop_button.grid(row=0, column=2, padx=10, pady=10)  # Stop button
        self.add_button.grid(row=0, column=3, padx=10, pady=10)  # Add Folder button

    def add_folder(self):
        """Allow user to select a folder and add all audio files within it."""
        folder_path = filedialog.askdirectory(title="Select Folder")  # Open folder selection dialog
        if folder_path:  # If a folder was selected
            # Define supported audio file extensions
            audio_extensions = (".mp3", ".wav", ".ogg")
            # Find all audio files in the selected folder
            files_in_folder = [
                os.path.join(folder_path,file)  # Get the full path of each file
                for file in os.listdir(folder_path)  # List all files in the folder
                if file.lower().endswith(audio_extensions)  # Filter for audio files
            ]
            self.playlist.extend(files_in_folder)  # Add found files to the playlist
            print("Files added to playlist:")  # Print added files
            for file in files_in_folder:
                print(len(self.playlist))
            

    def play_audio(self):
        """Play the current audio file."""
        if not self.playlist:  # If the playlist is empty
            print("Playlist is empty. Add audio files first.")  # Notify user
            return

        if self.current_index >= len(self.playlist):  # If the current index exceeds the playlist size
            print("End of playlist. Restarting.")  # Notify user
            self.current_index = 0  # Restart the playlist from the beginning

        file_to_play = self.playlist[self.current_index]  # Get the current file to play
        try:
            pygame.mixer.music.load(file_to_play)  # Load the audio file
            pygame.mixer.music.play()  # Start playback
            self.is_playing = True  # Set the playing status
            print(f"Playing: {file_to_play}")  # Print the file being played
            if not self.timer_thread.is_alive():
                 self.timer_thread.start()
        except Exception as e:  # Handle any errors
            print(f"Error playing file: {e}")  # Print error message


    def stop_audio(self):
        """Stop the current audio."""
        pygame.mixer.music.stop()  # Stop playback
        self.is_playing = False  # Set the playing status to False
        print("Playback stopped.")  # Notify user

    def next_audio(self):
        """Play the next audio file in the playlist."""
        if not self.playlist:  # If the playlist is empty
            print("Playlist is empty. Add audio files first.")  # Notify user
            return

        self.stop_audio()  # Stop the current audio
        self.is_changed = True
        time.sleep(1.5)
        # Increment the current index and loop back if it exceeds the playlist size
        self.current_index = (self.current_index + 1) % len(self.playlist)
        self.play_audio()  # Play the next audio
        


    def timer_threading(self):
         i = 0
         while True:
             self.text = tk.Label(root,text=str(i))
             self.text.grid(row=1, column=0, padx=10, pady=10)  # Add Folder button
             time.sleep(1)
             i = i+1
             if self.is_changed == True:
                 if(i<15):
                     print("changed too early")
                     index = self.current_index
                     if os.path.isfile(self.playlist[index]):
                        os.remove(self.playlist[self.current_index])
                        print("successful deleted")                    
                     i = 0
                     self.is_changed = False

                 else:
                  i = 0
                 self.is_changed = False 
                                    

                 


        
        

# Run the GUI application
if __name__ == "__main__":
    root = tk.Tk()  # Create the root Tkinter window
    root.config(background= "blue")
    player = AudioPlayer(root)  # Initialize the Audio Player with the root window
    
    root.mainloop()  # Start the Tkinter event loop
