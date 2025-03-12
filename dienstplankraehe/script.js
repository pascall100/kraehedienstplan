document.addEventListener("DOMContentLoaded", function() {
    const dienstOptionen = ["", "F1", "Frei", "F2", "S1", "S2", "NB", "N1", "N2", "ZW", "FB", "U", "Kr"];
    
    // Funktion zum Befüllen der Select-Optionen
    function befuellen(select) {
        dienstOptionen.forEach(opt => {
            let option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        });
    }

    // Funktion zum Ändern der Hintergrundfarbe der Zellen je nach Auswahl
    function farbeSetzen(select) {
        const parentTd = select.parentElement;
        switch (select.value) {
            case "F1": parentTd.style.backgroundColor = "#fff3cd"; break;
            case "S1": parentTd.style.backgroundColor = "#d4edda"; break;
            case "NB": parentTd.style.backgroundColor = "#cce5ff"; break;
            case "U": parentTd.style.backgroundColor = "#f8d7da"; break;
            default: parentTd.style.backgroundColor = "#fff"; break;
        }
    }

    // Funktion zum Initialisieren der Select-Elemente
    function initialisieren() {
        document.querySelectorAll(".dienst").forEach(select => {
            if (!select.dataset.initialized) {
                befuellen(select);
                select.addEventListener("change", () => farbeSetzen(select));
                select.dataset.initialized = "true";
            }
        });
    }

    // Initialisieren der bestehenden Select-Elemente
    initialisieren();

    // Funktion für den Button "Neue Woche" (fügt eine neue Zeile hinzu)
    window.neueWocheHinzufuegen = function() {
        let tbody = document.getElementById("dienstplan-body");
        let tr = document.createElement("tr");

        // Eine neue Zeile mit einem Textfeld für den Namen und Select-Elementen für die Wochentage erstellen
        tr.innerHTML = '<td><input type="text" class="name" placeholder="Name"></td>' +
            '<td><select class="dienst"></select></td>' +
            '<td><select class="dienst"></select></td>' +
            '<td><select class="dienst"></select></td>' +
            '<td><select class="dienst"></select></td>' +
            '<td><select class="dienst"></select></td>' +
            '<td><select class="dienst"></select></td>' +
            '<td><select class="dienst"></select></td>';
        
        // Die neue Zeile zur Tabelle hinzufügen
        tbody.appendChild(tr);
        
        // Die Select-Elemente in der neuen Zeile initialisieren
        initialisieren();
    }

    // Funktion für den Button "Zeile Entfernen" (löscht die letzte Zeile)
    window.letzteZeileEntfernen = function() {
        let tbody = document.getElementById("dienstplan-body");
        if (tbody.rows.length > 1) {
            tbody.deleteRow(-1);
        } else {
            alert("Die letzte Zeile kann nicht entfernt werden!");
        }
    }
});

