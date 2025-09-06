# 🥣 Breizubereitung - Rezeptverwaltung

Eine moderne, responsive Webanwendung zur Verwaltung von Breirezepten mit automatischer Portionsberechnung.

## ✨ Features

### 🔍 **Suchfunktion**
- Schnelle Suche durch alle verfügbaren Rezepte
- Echtzeit-Filterung beim Tippen

### 📱 **Responsive Design**
- Optimiert für Desktop, Tablet und Mobile
- Mobile-First Ansatz mit flexiblen Layouts

### ♿ **Barrierefreiheit**
- Vollständige Keyboard-Navigation
- ARIA-Labels für Screen Reader
- Semantische HTML5-Struktur

### 🎨 **Moderne Benutzeroberfläche**
- Schönes, professionelles Design
- Smooth Animations und Übergänge
- Intuitive Bedienung

### 💾 **Lokale Datenspeicherung**
- Alle Rezepte werden im Browser gespeichert
- Keine Server-Anmeldung erforderlich
- Automatisches Speichern von Änderungen

### 🧮 **Portionsberechnung**
- Dynamische Anpassung der Zutatenmengen
- Echtzeit-Berechnung der Gesamtmengen
- Präzise Dezimalstellen-Anzeige

## 🚀 Installation & Verwendung

### Voraussetzungen
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Keine zusätzlichen Abhängigkeiten erforderlich

### Installation
1. **Repository klonen oder herunterladen**
   ```bash
   git clone [repository-url]
   cd brei-zubereitung
   ```

2. **Datei öffnen**
   - Öffnen Sie `index.html` in Ihrem Webbrowser
   - Oder starten Sie einen lokalen Server:
   ```bash
   # Mit Python
   python -m http.server 8000
   
   # Mit Node.js (http-server)
   npx http-server
   
   # Mit PHP
   php -S localhost:8000
   ```

3. **Anwendung nutzen**
   - Öffnen Sie `http://localhost:8000` in Ihrem Browser

## 📖 Bedienungsanleitung

### Rezepte durchsuchen
1. Geben Sie den Namen einer Breisorte in das Suchfeld ein
2. Die Liste wird automatisch gefiltert

### Rezept anzeigen
1. Klicken Sie auf eine Breisorte in der Liste
2. Das Rezept wird mit allen Zutaten angezeigt
3. Passen Sie die Portionsanzahl an, um Mengen automatisch zu berechnen
4. Ändern Sie Zutatenmengen direkt in der Tabelle

### Neues Rezept hinzufügen
1. Scrollen Sie zum Bereich "Neue Breisorte hinzufügen"
2. Geben Sie einen Namen für den Brei ein
3. Fügen Sie Zutaten mit Mengen hinzu
4. Klicken Sie auf "Brei hinzufügen"

### Rezept bearbeiten
1. Wählen Sie ein bestehendes Rezept aus
2. Ändern Sie die Mengen in der Tabelle
3. Änderungen werden automatisch gespeichert

## 🏗️ Technische Details

### Architektur
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Datenpersistierung**: Browser localStorage
- **Design**: CSS Grid, Flexbox, CSS Custom Properties
- **Architektur**: Klassenbasierte JavaScript-Struktur

### Browser-Unterstützung
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Dateistruktur
```
brei-zubereitung/
├── index.html          # Hauptanwendung
└── README.md          # Diese Dokumentation
```

## 🎯 Verwendete Technologien

### HTML5
- Semantische Elemente (`<header>`, `<main>`, `<section>`)
- Formular-Validierung
- ARIA-Attribute für Barrierefreiheit

### CSS3
- CSS Custom Properties (Variablen)
- CSS Grid und Flexbox
- Responsive Design mit Media Queries
- CSS-Animationen und Übergänge

### JavaScript (ES6+)
- Klassenbasierte Architektur
- Event Delegation
- LocalStorage API
- DOM-Manipulation

## 🔧 Entwicklung

### Code-Struktur
```javascript
class BreiManager {
  constructor()           // Initialisierung
  initializeElements()    // DOM-Elemente sammeln
  initializeData()        // Daten laden/initialisieren
  bindEvents()           // Event-Listener binden
  renderBreiGrid()       // Rezeptliste rendern
  showRecipe()           // Rezept anzeigen
  addNewRecipe()         // Neues Rezept hinzufügen
  // ... weitere Methoden
}
```

### CSS-Architektur
- **CSS Custom Properties** für konsistente Farben
- **Mobile-First** responsive Design
- **Modulare Klassen** für wiederverwendbare Komponenten

## 🎨 Design-System

### Farbpalette
```css
--primary-color: #2563eb      /* Hauptfarbe */
--success-color: #10b981      /* Erfolg */
--error-color: #ef4444        /* Fehler */
--warning-color: #f59e0b      /* Warnung */
--background-color: #f8fafc   /* Hintergrund */
--surface-color: #ffffff      /* Oberflächen */
```

### Typografie
- **Schriftart**: System-Fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI')
- **Hierarchie**: H1 (2.5rem) → H2 (1.8rem) → Body (1rem)

## 🚀 Performance-Optimierungen

- **Lazy Loading** der Rezeptdaten
- **Event Delegation** für bessere Performance
- **Debounced Search** für Suchfunktion
- **Optimierte DOM-Manipulation**
- **CSS-Animationen** statt JavaScript-Animationen

## 🔒 Datenschutz

- **Keine Server-Kommunikation** - alle Daten bleiben lokal
- **Keine Cookies** oder Tracking
- **Lokale Speicherung** im Browser localStorage
- **Vollständige Kontrolle** über Ihre Daten

## 🤝 Beitragen

### Bug Reports
1. Öffnen Sie ein Issue mit detaillierter Beschreibung
2. Fügen Sie Browser- und Systeminformationen hinzu
3. Beschreiben Sie die Schritte zur Reproduktion

### Feature Requests
1. Beschreiben Sie das gewünschte Feature
2. Erklären Sie den Nutzen für andere Benutzer
3. Fügen Sie Mockups oder Beispiele hinzu

### Code-Beiträge
1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch
3. Committen Sie Ihre Änderungen
4. Erstellen Sie einen Pull Request

## 📝 Changelog

### Version 2.0.0 (Aktuell)
- ✨ Komplette Neugestaltung der Benutzeroberfläche
- 🔍 Suchfunktion hinzugefügt
- ♿ Barrierefreiheit verbessert
- 📱 Responsive Design implementiert
- 🎨 Modernes CSS-Design
- 🏗️ Klassenbasierte JavaScript-Architektur
- 🔔 Toast-Benachrichtigungen
- ⌨️ Keyboard-Navigation

### Version 1.0.0
- 🥣 Grundlegende Rezeptverwaltung
- 💾 Lokale Datenspeicherung
- 🧮 Portionsberechnung

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 👨‍💻 Autor

Entwickelt mit ❤️ für eine bessere Rezeptverwaltung.

---

**Hinweis**: Diese Anwendung funktioniert vollständig offline und speichert alle Daten lokal in Ihrem Browser. Es werden keine Daten an externe Server übertragen.
