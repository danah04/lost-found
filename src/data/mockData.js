export const categories = ["Electronics", "Documents", "Accessories", "Bags", "Personal Items", "Books", "Other"];
export const locations = ["KFUPM Library", "Building 22", "Building 24", "Building 58", "Student Mall", "Gym", "Cafeteria", "Parking Area", "Administration Office"];

export const foundItems = [
  { id: "f-1001", type: "found", title: "Blue Backpack", category: "Bags", description: "A blue backpack with a single main compartment and a small front pocket. Contains notebooks and a water bottle.", location: "KFUPM Library", date: "2026-02-05", time: "14:30", status: "Approved", finder: "Sara Al-Otaibi", imageUrl: "/images/backpack.svg", suggestedMatches: ["l-2001", "l-2002"] },
  { id: "f-1002", type: "found", title: "KFUPM ID Card", category: "Documents", description: "Student ID card found near the coffee area. Name is partially visible.", location: "Student Mall", date: "2026-02-04", time: "10:10", status: "Pending Review", finder: "Ahmed Hassan", imageUrl: "/images/id-card.svg", suggestedMatches: ["l-2003"] },
  { id: "f-1003", type: "found", title: "Silver Watch", category: "Accessories", description: "Silver wrist watch found next to a study table.", location: "Building 24", date: "2026-02-03", time: "18:00", status: "Approved", finder: "Maha Nasser", imageUrl: "/images/watch.svg", suggestedMatches: [] },
  { id: "f-1004", type: "found", title: "Black Umbrella", category: "Personal Items", description: "Black folding umbrella found after class.", location: "Building 58", date: "2026-02-02", time: "12:45", status: "Recovered", finder: "Lena Alqaissom", imageUrl: "/images/umbrella.svg", suggestedMatches: ["l-2004"] },
  { id: "f-1005", type: "found", title: "Course Textbook", category: "Books", description: "Orange software engineering textbook left on a study desk.", location: "Building 22", date: "2026-02-01", time: "16:20", status: "Approved", finder: "Wujud Hazazi", imageUrl: "/images/book.svg", suggestedMatches: [] },
  { id: "f-1006", type: "found", title: "Green Phone", category: "Electronics", description: "A phone with a green case found near the cafeteria entrance.", location: "Cafeteria", date: "2026-01-30", time: "13:05", status: "Pending Review", finder: "Danah Aldosary", imageUrl: "/images/phone.svg", suggestedMatches: [] },
];

export const lostItems = [
  { id: "l-2001", type: "lost", title: "Lost Blue Backpack", category: "Bags", description: "Blue backpack containing notebooks, calculator, and a bottle.", location: "KFUPM Library", date: "2026-02-05", status: "Missing", owner: "Noura Al-Salem", imageUrl: "/images/backpack.svg" },
  { id: "l-2002", type: "lost", title: "Lost Dark Bag", category: "Bags", description: "Dark blue bag, likely left near study tables.", location: "KFUPM Library", date: "2026-02-05", status: "Missing", owner: "Dalia Alquwaidhi", imageUrl: "/images/backpack.svg" },
  { id: "l-2003", type: "lost", title: "Student ID Card", category: "Documents", description: "KFUPM ID card lost around Student Mall.", location: "Student Mall", date: "2026-02-04", status: "Missing", owner: "Danah Aldosary", imageUrl: "/images/id-card.svg" },
  { id: "l-2004", type: "lost", title: "Black Umbrella", category: "Personal Items", description: "Black umbrella lost near Building 58 after class.", location: "Building 58", date: "2026-02-02", status: "Missing", owner: "Wujud Hazazi", imageUrl: "/images/umbrella.svg" },
];
export const claims = [
  { id: "c-3001", itemId: "f-1001", itemTitle: "Blue Backpack", claimant: "Noura Al-Salem", proof: "Contains a Casio calculator, SWE notebook, and blue water bottle.", status: "Pending", submittedAt: "2026-02-05 15:10" },
  { id: "c-3002", itemId: "f-1002", itemTitle: "KFUPM ID Card", claimant: "Ahmed Al-Qahtani", proof: "Student number starts with 2023 and card has a small scratch on the corner.", status: "Pending", submittedAt: "2026-02-04 11:25" },
];
export const reports = [
  { id: "r-4001", target: "Found Wallet listing", reportedBy: "Maha", reason: "Possible duplicate/spam listing", status: "Open", timestamp: "2026-02-05 09:30" },
  { id: "r-4002", target: "User claim on laptop", reportedBy: "Sara", reason: "Claim details do not match the item", status: "Open", timestamp: "2026-02-04 17:42" },
];
export const notifications = [
  { id: "n-1", title: "Claim submitted", message: "Your claim for Blue Backpack is pending moderator review.", read: false },
  { id: "n-2", title: "Listing approved", message: "Your found item listing is now visible in search results.", read: false },
  { id: "n-3", title: "New message", message: "A finder replied to your item inquiry.", read: true },
];
export const messages = [
  { id: "m-1", sender: "Finder", text: "Hi, I found an item that may be yours. Can you describe a unique detail?", time: "10:30 AM" },
  { id: "m-2", sender: "You", text: "Yes, the backpack has a small sticker inside the front pocket.", time: "10:33 AM" },
  { id: "m-3", sender: "Finder", text: "That matches. I submitted it for moderator review.", time: "10:35 AM" },
];
export const auditLogs = ["Approved Blue Backpack listing by Moderator Demo at 2026-02-05 15:45", "Requested clarification for KFUPM ID Card at 2026-02-04 12:10", "Archived Black Umbrella after return confirmation at 2026-02-03 13:20"];
