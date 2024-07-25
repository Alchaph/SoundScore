![SoundScore](logo.png "Logo SoundScore")
## Timo, Marc & Nevio

### Git
- At least 1 commit every day.
  
  #### Push:
- Pull branch from Main to your Branch
- Fix Conflict
- "Senior" checks Code (Review)
- Push Branch to Main
  
  #### Commit:
- Commit Message should be a short description of the Changes
- Control Commit-Files after unnecessary Files
- Commit messages should have the following structure:
    - SHORT_INFO: e.g. "fix", "feat", "docs"
    - MESSAGE: e.g. "add POST operation to user controller"
    - Structure commit message: SHORT_INFO: MESSAGE
    - Example: "docs: add conditions for git commit messages"

Pull Request Regeln:
Klarer und Beschreibender Titel

- Der Titel des PRs sollte kurz und prägnant den Zweck des PRs beschreiben.
Beispiel: "Feature: Implement User Authentication" oder "Bugfix: Correct NullPointerException in UserService".
Detaillierte Beschreibung

- Gebe eine detaillierte Beschreibung des PRs an, die erklärt, was geändert wurde und warum.
Erwähne relevante Tickets, Aufgaben oder User Stories, wenn vorhanden.
Beispiel: "Dieser PR implementiert die Benutzer-Authentifizierung mittels JWT. Dies ist ein Teil der User Story #1234."
Kleine und Fokussierte Änderungen

- PRs sollten so klein und fokussiert wie möglich sein. Vermeide es, zu viele Änderungen in einem einzigen PR zu kombinieren.
Beispiel: Ein PR sollte entweder einen neuen Feature-Branch oder einen Bugfix enthalten, nicht beides.
Code Reviews

- Jeder PR muss mindestens von zwei anderen Teammitgliedern geprüft und genehmigt werden, bevor er gemerged wird.
Beispiel: "Dieser PR muss von @username1 und @username2 geprüft werden."
Tests

- Alle Änderungen sollten von Unit-Tests und, wenn möglich, von Integrationstests begleitet werden.
Neue Funktionen sollten durch neue Tests abgedeckt werden.
Beispiel: "Test-Coverage für diese Änderung beträgt 95%."
Linting und Formatierung

- Stelle sicher, dass der Code den festgelegten Stilrichtlinien und Linting-Regeln entspricht.
Beispiel: "Dieser PR besteht alle Linting-Checks und verwendet die festgelegten Code-Stilrichtlinien."
Build Status

- Alle PRs müssen durch ein automatisches Build-System laufen und dürfen nur dann gemerged werden, wenn alle Checks bestanden sind.
Beispiel: "Dieser PR besteht alle CI/CD-Checks."
Konfliktfreie Branches

- Der Branch, der gemerged werden soll, muss konfliktfrei mit dem Zielbranch sein.
Beispiel: "Bevor dieser PR gemerged wird, müssen alle Konflikte gelöst werden."
Dokumentation

- Alle relevanten Änderungen müssen dokumentiert werden, sei es in der Projekt-Wiki, in der Code-Dokumentation oder in den Release-Notes.
Beispiel: "Dokumentation zur neuen API-Route wurde in der Projekt-Wiki aktualisiert."
Feedback und Änderungen

- Gehe auf das Feedback der Reviewer ein und nimm die notwendigen Änderungen vor.
Beispiel: "Feedback von @reviewer wurde eingearbeitet."
Branch Naming Convention

- Befolge die Branch-Naming-Konventionen, um Verwirrung zu vermeiden.
Beispiel: "feature/user-authentication" oder "bugfix/nullpointer-exception".
Commit Messages

- Commit-Nachrichten sollten klar und beschreibend sein.
Beispiel: "Add JWT authentication to user login."
No Direct Pushes to Main/Develop Branches

- Änderungen dürfen nicht direkt in die Haupt- oder Entwicklungs-Branches gepusht werden, sondern müssen immer über PRs erfolgen.
Beispiel: "Direkte Pushes zu main sind verboten. Verwende einen PR."
Peer Programming Encouraged

- Fördere Peer Programming oder Pair Programming für komplexe Änderungen, um die Codequalität zu verbessern.
Beispiel: "Für komplexe Änderungen wird Peer Programming empfohlen."
Changelog

- Aktualisiere das Changelog, wenn der PR bedeutende Änderungen enthält, die für die nächsten Releases relevant sind.
Beispiel: "Changelog wurde mit den neuen Feature-Änderungen aktualisiert."
