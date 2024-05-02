import { defineStore } from "pinia";
import request from "@/lib/request.js";

interface Note {
	noteId: number;
	userId: number;
	title: string;
	content: string;
	render: string;
	createAt: string;
	updateAt: string;
}

interface NoteStore {
	notes: Note[];
	isLoading: boolean;
}

export const useNoteStore = defineStore("Note", {
	state(): NoteStore {
		return {
			notes: [],
			isLoading: true
		};
	},
	actions: {
		search(word: string): Note[] {
			return this.notes.filter(
				(note) => note.content.includes(word) || note.title.includes(word)
			);
		},
		getById(id: number): Note | undefined {
			return this.notes.find((note) => note.noteId === id);
		},
		load() {
			this.isLoading = true;
			request
				.get("http://localhost:3000/api/note")
				.then((response) => {
					this.notes = response.data?.data;
				})
				.catch((error) => {
					console.log(error);
					this.notes = [];
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
		getAll(): Note[] {
			return this.notes;
		}
	}
});

// export const useNoteStore = defineStore("Note", {
// 	state: async () => {
// 		try {
// 			const response = await request.get("http://localhost:3000/api/note");
// 			return {
// 				notes: response.data?.data as Note[]
// 			};
// 		} catch (error) {
// 			return {
// 				notes: []
// 			};
// 		}
// 	},
// 	actions: {
// 		async search(word: string): Promise<Note[]> {
// 			return (await this).notes.filter(
// 				(note: Note) => note.content.includes(word) || note.title.includes(word)
// 			);
// 		},
// 		async getById(id: number): Promise<Note | undefined> {
// 			this.load();
// 			return (await this).notes.find((note: Note) => note.noteId === id);
// 		},
// 		async load() {
// 			try {
// 				const response = await request.get("http://localhost:3000/api/note");
// 				const notes = response.data?.data;
// 				(await this).notes = notes;
// 				return { status: true, data: notes };
// 			} catch (error: any) {
// 				if (error instanceof AxiosError) {
// 					const response = error.response?.data;
// 					return { ...response };
// 				} else {
// 					return { status: false, error };
// 				}
// 			}
// 		},
// 		async getAll(): Promise<Note[]> {
// 			return (await this).notes;
// 		}
// 	}
// });

// export const useNoteStore = defineStore("Note", () => {
// 	const notes = ref([] as Note[]);

// 	(async () => {
// 		try {
// 			const response = await request.get("http://localhost:3000/api/note");
// 			notes.value = response.data?.data;
// 		} catch (error) {
// 			notes.value = [];
// 		}
// 	})();

// 	console.log(notes.value);

// 	const search = (word: string) => {
// 		return notes.value.filter(
// 			(note: Note) => note.content.includes(word) || note.title.includes(word)
// 		);
// 	};

// 	const getById = (id: number) => {
// 		return notes.value.find((note: Note) => note.noteId === id);
// 	};

// 	const getAll = (): Note[] => {
// 		return notes.value;
// 	};

// 	return {
// 		notes,
// 		getAll,
// 		getById,
// 		search
// 	};
// });
