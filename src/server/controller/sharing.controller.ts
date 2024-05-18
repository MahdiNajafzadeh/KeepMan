import {
	sharings_get_all_note_all_user,
	sharings_get_all_note_one_user,
	sharings_get_one_note_all_user,
	sharings_get_one_note_one_user,
} from "./handler/sharings.get.handler";

export default {
	get: {
		all: {
			note: {
				all: {
					user: sharings_get_all_note_all_user,
				},
				one: {
					user: sharings_get_all_note_one_user,
				},
			},
		},
		one: {
			note: {
				all: {
					user: sharings_get_one_note_all_user,
				},
				one: {
					user: sharings_get_one_note_one_user,
				},
			},
		},
	},
	create: () => {},
	update: () => {},
	delete: () => {},
};
