## 2026-11-05T06:26:55Z

This is a single self-contained fix; keep it small and focused. Restore consistent navigation bar configuration and design across pages, and restore the letter-by-letter fading animation on the hero headline that broke.

Working directory: C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo
Integrity mode: development

Reference material:
- Target venue subpage: C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\venues\open-earth-lawn.html
- Homepage reference: C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\index.html (Do NOT modify)
- Original Casa Momo reference: C:\Users\Sambhav\.gemini\antigravity\scratch\replications\casamomo\venues\casamomo_boutique_n1_original.html
- Local preview server: http://localhost:3003/venues/open-earth-lawn
- Reference screenshots:
  - Navbar button detail: C:\Users\Sambhav\.gemini\antigravity\brain\24686084-37ef-41cd-b8d3-ed0023ab71ec\.user_uploaded\media_1793859231371_192783ce.png
  - Current navbar and hero: C:\Users\Sambhav\.gemini\antigravity\brain\24686084-37ef-41cd-b8d3-ed0023ab71ec\.user_uploaded\media_1793859280171_e667e7a9.png

## Requirements

### R1. Navigation Bar Consistency
The navigation bar configuration and design in `venues/open-earth-lawn.html` must stay consistent with `index.html`. This includes navigation links (Venues, About, Contact), layout, and "Book Now" button styling.

### R2. Hero Headline Letter-by-Letter Animation
The letter-by-letter fading animation on the "Open Earth Lawn" hero headline when scrolling must be restored to working order.

### R3. File Scope and Constraints
All changes must be confined strictly to `venues/open-earth-lawn.html`. Do NOT modify `index.html`.

## Acceptance Criteria

### Navigation Bar
- [ ] Navigation bar layout and links (Venues, About, Contact) in `venues/open-earth-lawn.html` match `index.html`.
- [ ] "Book Now" button in `venues/open-earth-lawn.html` matches the styling of the button in `index.html` and reference screenshot `media_1793859231371_192783ce.png`.
- [ ] `index.html` remains unchanged.

### Hero Headline Animation
- [ ] Scrolling causes the "Open Earth Lawn" hero headline letters to fade in letter by letter as expected.

### Verification
- [ ] Changes are verified against the running preview server at `http://localhost:3003/venues/open-earth-lawn` and the reference screenshots.


## 2026-11-05T07:48:51Z

User Feedback on current build:
"casamomo fade transition and look at the grand, the transition should be like casamomo"

Images provided by user:
1. Casa Momo reference: `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793864180686_bfeeb912.jpg`
2. Current The Grand build: `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1793864183080_0d133215.jpg`

Issue Analysis:
- In Casa Momo (image 1): When Photo 6 reaches the upper-right corner as shown, the hero letters have ALREADY completely rolled out / faded, and the background color is pure clean cream (#FFF0CA / #E8DBB7). Zero lingering letters in the center.
- In The Grand (image 2): At that same scroll position, letters ("h", "L", "awn") are still floating, rotated, and scattered in the center of the screen, and the background is a murky olive drab (halfway transitioned) instead of pure cream.
- Requirement: Align the letter fade-out and background color transition timeline so that by the time Photo 6 reaches this exit position, all hero letters have cleanly faded out and the background is pure cream, matching Casa Momo exactly.

Note: ORIGINAL_REQUEST.md has been updated with this follow-up feedback. Ensure all changes remain strictly confined to `venues/open-earth-lawn.html` and `index.html` remains unmodified.
