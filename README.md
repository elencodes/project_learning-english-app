<div id="header">
<h1>A Single-page App (SPA) for Learning English Language</h1>
<p>The application, which offers interactive tools for learning English using flashcards, was created on React, MobX and API.</p>
<p>The main language for studying is English, with Russian as the translation.
The received data from the server (API) is transferred to a table (Vocabulary Page) and to a page with word cards (Game Page).
On the Vocabulary Page, each word in the table has its main meaning, transcription, translation, and theme.
The Game Page shows cards with the entire list of words from the database (API), but by default the translation of the word is always hidden.
The training mode (Game Page) is necessary for better memorization of new words and successful learning of a foreign language.</p>
<img src="https://github.com/elencodes/project_learning-english-app/blob/main/public/gif/promo.gif">
<h2>Application link:</h2>
<a href="https://elencodes.github.io/project_learning-english-app/">Learning Languages App</a>
<h2>Used technologies:</h2> 
	<div id=technologies>
		<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
		<img src="https://img.shields.io/badge/REACT%20ROUTER-D0D6E1?style=for-the-badge&logo=REACT-ROUTER">
		<img src="https://img.shields.io/badge/MobX-035193?style=for-the-badge&logo=MobX">
		<img src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black">
		<img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white">
		<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
		<img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
	</div>
<h2>Application functionality:</h2>
<ul>
  <li>MobX sends API requests, which allows you to interact with the word store by changing, deleting, and adding new elements (all changes are saved on the server, and updated data is immediately 
  displayed on the screen).</li>
  <li>A convenient form of adding a new word to the table has been implemented (with validation hints for correct data entry).</li>
  <li>The word can be found by its English meaning or Russian translation.</li>
  <li>For more in-depth language learning, the table implements a filter of words on specific topics.</li>
  <li>🔥<b> FOR CONVENIENCE AND INCREASED USER SATISFACTION:</b> <br>
  ✔ a dynamic theme changer feature has been added, allowing you to switch between light and dark themes; <br>
  ✔ while waiting for the server response, an animated data loading indicator appears, as well as error messages; <br>
  ✔ starting with the iPhone 5/SE (max-width screen of 320 pixels) and up to the iPad Mini (max-width screen of 768 pixels), each row of the table is converted into a card block - the table from the desktop version of the interface adapts to mobile devices. <br>
  </li>
  <li>In the training mode (Game Page), if a person clicks the "view translation" button on the word card, the counter of the studied words is triggered (increases by 1 with each new click).</li>
  <li>When all the words are learned, a notification window appears on the successful completion of the game.The training mode can be run indefinitely, the number of attempts is unlimited.</li>
</ul>
<img src="https://github.com/elencodes/project_learning-english-app/blob/main/public/github/mobile-vocabulary-page-1.png" height="380">
<img src="https://github.com/elencodes/project_learning-english-app/blob/main/public/github/mobile-vocabulary-page-2.png" height="380">
<img src="https://github.com/elencodes/project_learning-english-app/blob/main/public/github/mobile-game-page.png" height="380">
<h2>Developed by:</h2> 
<div id=bages>
	<p><a href="https://github.com/elencodes"><img src="https://img.shields.io/badge/ELENA-2E2844?style=for-the-badge&logo=github"></a></p>
  <p>Contacts: <a href="https://t.me/elencodes">Telegram</a> | <a href="mailto:esadikova.codes@gmail.com">E-mail</a></p>
</div>
