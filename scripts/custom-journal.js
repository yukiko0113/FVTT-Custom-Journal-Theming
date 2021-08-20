// The custom parent class that allows the various setting needed to have 
// a choice of journals similar to what actor sheets get
class CustomJournalSheet extends JournalSheet {


	get journal(){
		return this.object;
	}

	static get defaultOptions() {
		const options = super.defaultOptions;
		options.baseApplication = "JournalSheet";
		options.classes.push('custom-journal');
		return options;
	}

	/*
	 *	Useful in creating a custom TinyMCE editor, to be looked into for further 
	 *	tinkering in that direction.
	 */
	// _createEditor(target, editorOptions, initialContent) {
	// 	editorOptions.content_css = "./dark-slate-journal.css";
	// 	return super._createEditor(target, editorOptions, initialContent);
	// };

	//Include the option for the Drop Cap style in the editor styles' menu
	activateEditor(name, options={}, ...args) {
		if (!options.style_formats) 
		{
			options.style_formats = [
				{
					title: "Custom",
					items: [
						{
							title: "Secret",
							block: 'section',
							classes: 'secret',
							wrapper: true
						}
					]
				}
			];
		}
		options.style_formats.push(
			{
				title: game.i18n.localize("custom-journal.StyleSection"),
				items: [
					{
						title: game.i18n.localize("custom-journal.DropCap"),
						inline: 'span',
						classes: 'drop-cap' 
					},
					{
						title: game.i18n.localize("custom-journal.SimpleBlock"),
						block: 'section',
						classes: 'simple-block',
						wrapper: true
					},
					{
						title: game.i18n.localize("custom-journal.SimpleBlockFloat"),
						block: 'section',
						classes: 'simple-block-float',
						wrapper: true
					},
					{
						title: game.i18n.localize("custom-journal.RidgedBlock"),
						block: 'section',
						classes: 'ridged-block',
						wrapper: true
					},
					{
						title: game.i18n.localize("custom-journal.RidgedBlockFloat"),
						block: 'section',
						classes: 'ridged-block-float',
						wrapper: true
					}
				]
			}
		);
		super.activateEditor(name, options, ...args);
	}
	
	// Add the sheet configuration button to the journal header
	_getHeaderButtons() {
		const canConfigure = game.user.isGM || this.object.isOwner;
		
		let buttons = super._getHeaderButtons();
        
        let buttonIndex = 0;
        for(let u of buttons) {
        	if(u.label === "Close") { break; }
        	buttonIndex++;
        }

		// Journal Configuration
		if (this.options.editable && canConfigure) {
			buttons.splice(buttonIndex, 0, {
					label: "Sheet",
					class: "configure-sheet",
					icon: "fas fa-cog",
					onclick: ev => this._onConfigureSheet(ev),
				});
		}
		return buttons
	}

	// Allow the sheet configuration button to actually *do* something
	_onConfigureSheet(event) {
		event.preventDefault();
		new EntitySheetConfig(this.journal, {
			top: this.position.top + 40,
			left: this.position.left + ((this.position.width - 400) / 2)
		}).render(true);
	}

}

/* CUSTOMIZE
 * Add any extra themes here: just copy-paste the whole block, changing only the class
 * name for the theme's name that will appear in the drop-down, and the name in single
 * quotes (here, dark-slate-journal) with whatever name you gave your theme in the .css
 * file
 */
class DarkModeJournal extends CustomJournalSheet {
	static get defaultOptions() {
		const options = super.defaultOptions;
		options.classes.push('dark-mode-journal');
		return options;
	}
}

class DarkSlateJournal extends CustomJournalSheet {
	static get defaultOptions() {
		const options = super.defaultOptions;
		options.classes.push('dark-slate-journal');
		return options;
	}
}

class HandwrittenLetter extends CustomJournalSheet {
	static get defaultOptions() {
		const options = super.defaultOptions;
		options.classes.push('handwritten-letter');
		return options;
	}
}

class HandwrittenLetterTwo extends CustomJournalSheet {
	static get defaultOptions() {
		const options = super.defaultOptions;
		options.classes.push('handwritten-letter-two');
		return options;
	}
}

class RoyalJournal extends CustomJournalSheet {
	static get defaultOptions() {
		const options = super.defaultOptions;
		options.classes.push('royal-journal');
		return options;
	}
}

class SciFiOneJournal extends CustomJournalSheet {
	static get defaultOptions() {
		const options = super.defaultOptions;
		options.classes.push('sci-fi-one-journal');
		return options;
	}
}

class SciFiTwoJournal extends CustomJournalSheet {
	static get defaultOptions() {
		const options = super.defaultOptions;
		options.classes.push('sci-fi-two-journal');
		return options;
	}
}

Hooks.on("preDocumentSheetRegistrarInit", (settings) => {
  settings["JournalEntry"] = true;
});

Hooks.on("documentSheetRegistrarInit", (documentTypes) => {
console.log("Custom Journals | Registering the module's sheets.");

/*CUSTOMIZE
 * Here, register your sheet so it shows up properly in the dropdown, just change
 * for your sheet name and you're good to go
 */
// The default Foundry journal
Journal.registerSheet("journals", CustomJournalSheet, {
	label: game.i18n.localize("custom-journal.CustomJournalSheet"),
	types: ["base"],
	makeDefault: true
});

Journal.registerSheet("journals", DarkModeJournal, {
	label: game.i18n.localize("custom-journal.DarkMode"),
	types: ["base"],
	makeDefault: false
});

Journal.registerSheet("journals", DarkSlateJournal, {
	label: game.i18n.localize("custom-journal.DarkSlate"),
	types: ["base"],
	makeDefault: false
});

Journal.registerSheet("journals", HandwrittenLetter, {
	label: game.i18n.localize("custom-journal.HandwrittenLetter"),
	types: ["base"],
	makeDefault: false
});

Journal.registerSheet("journals", HandwrittenLetterTwo, {
	label: game.i18n.localize("custom-journal.HandwrittenLetterTwo"),
	types: ["base"],
	makeDefault: false
});

Journal.registerSheet("journals", RoyalJournal, {
	label: game.i18n.localize("custom-journal.Royal"),
	types: ["base"],
	makeDefault: false
});

Journal.registerSheet("journals", SciFiOneJournal, {
	label: game.i18n.localize("custom-journal.SciFiOne"),
	types: ["base"],
	makeDefault: false
});

Journal.registerSheet("journals", SciFiTwoJournal, {
	label: game.i18n.localize("custom-journal.SciFiTwo"),
	types: ["base"],
	makeDefault: false
});

EntitySheetConfig.updateDefaultSheets(game.settings.get("core", "sheetClasses"));

console.log("Custom Journals | Ready.")
});