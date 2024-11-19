import pyautogui
import time

time.sleep(3)  

while True:
    pyautogui.typewrite('console.log("hello");')
    pyautogui.press('enter')  
    time.sleep(5)