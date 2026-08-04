---
target: /g landing page
total_score: 25
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 2
timestamp: 2026-08-02T21-11-59Z
slug: web-app-g-page-tsx
---
# Impeccable Critique — /g "Boutique Latam" (Brandon Brokerage Group)

Method: dual-agent (A: design review · B: detector)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "SCROLL TO REVEAL" hint never leaves; renders on mobile where nothing reveals |
| 2 | Match System / Real World | 3 | "FN" stat assumes recall; ES mixes voseo ("Consultá", "SCROLLEÁ") with usted ("Cuéntenos") |
| 3 | User Control and Freedom | 2 | ~550vh of pinned scroll-hijack (deck 300vh + journey 250vh) with no skip; lang toggle replays hero choreography mid-read |
| 4 | Consistency and Standards | 2 | "See all solutions" → #contact; all 4 "Read more" → #contact; deck cards have cursor:pointer + hover lift but no click action |
| 5 | Error Prevention | 3 | Assistant disables Send while typing/empty; chips disable after use; solid |
| 6 | Recognition Rather Than Recall | 3 | "5 Product lines" never enumerated anywhere; deck shows four pillars |
| 7 | Flexibility and Efficiency | 3 | EN/ES toggle, tel: deep links, scenario chips; lang not persisted or in URL |
| 8 | Aesthetic and Minimalist Design | 3 | Four typefaces; Archivo-900 deck headline is a voice from another concept; trust bar repeats hero eyebrow facts |
| 9 | Error Recovery | 3 | Assistant fallback is a graceful dead-end; little else can error |
| 10 | Help and Documentation | n/a | Persuade landing; disclaimer + assistant demo cover it |
| **Total** | | **25/36** | **~69%, borderline Acceptable/Good** |

## Design Specificity Verdict

**Authored, with a generic skeleton.** CaseJourney (the LatAm→Miami case arc with status flip to "PLACED") and the AgentTools underwriting answers are real product authorship no template has. The structural spine (photo hero + count-up stats + pinned deck + marquee + insights grid + dark close) is the standard premium-landing kit shared with /a–/i. Biggest missed opportunity: "Est. the 1960s" appears three times but the page shows zero heritage (no year, no face, no artifact).

**Deterministic scan:** 0 findings across all 6 files (page.tsx, page.module.css, CaseJourney, AgentTools, motion, MobileMenu). Detector clean; the issues are UX/conversion, not mechanical genericness.

## Priority Issues

- **[P0] Navigation dead zone 901–980px.** .headerNav hides at ≤980px but the hamburger appears only at ≤900px. Tablets in that band get a logo and nothing else. Fix: align both breakpoints. → $impeccable adapt
- **[P0] Primary conversion is a tel: link with no written channel.** Every CTA funnels to #contact where the button is tel: on desktop (WhatsApp disabled), no form, no email, despite "Tell us about your case." Fix: minimal form or mailto alongside the phone. → $impeccable shape / harden
- **[P1] Deceptive link destinations.** "See all solutions" → #contact, four "Read more" → #contact, deck cards styled clickable with no action. Fix: honest labels, remove fake affordances. → $impeccable clarify
- **[P1] html lang never reflects ES; lang toggle remounts animated containers and replays entrances.** Fix: update document lang, swap text without remount. → $impeccable harden
- **[P2] Small-text contrast misses.** GOLD_DEEP eyebrows ≈4.0:1 at 11px; deck hint ≈3.1:1; marquee carrier names ≈2.6:1. Fix: darken one step each. → $impeccable audit

## Persona Red Flags

**Jordan (first-timer):** hero CTA → #contact → a phone number; on desktop tel: opens a protocol dialog or nothing — dead-end primary action. Deck cards look clickable, aren't. "FN" and "5 product lines" unexplained.

**Riley (stress tester):** 901–980px nav dead zone. Lang toggle replays hero/mission/insights entrances and leaves a mixed EN/ES chat transcript. html lang="en" hardcoded, so Spanish is read with English pronunciation by screen readers. Reduced-motion desktop still scrolls 300vh of nothing at the deck.

**Casey (mobile):** deck and journey degrade correctly (genuinely well handled). But mobile deck = four ~560px near-identical Miami skyline cards; "SCROLLEÁ PARA REVELAR" renders with nothing to reveal; mobile menu "Asistente IA" is an anchor jump (not the modal) with no scroll-margin-top under the fixed pill; ES hero line "extraordinarios." risks clipping at 360px. tel: CTA is right for this persona.

## What's Working

1. CaseJourney is real design authorship — argues the firm's differentiator visually, degrades responsibly.
2. The motion system has a house voice: one easing curve everywhere, reduced-motion threaded through, CountUp renders final value for no-JS/SEO.
3. The AI assistant has substance: verifiable underwriting answers, honest fallback, disabled states.

## Minor Observations

- spcTitle1/2/spcBody are dead copy in the T object.
- Trust bar repeats hero eyebrow facts within one viewport.
- "412 cases placed" / "CASE No. 2847 · $5M UL" — if invented, compliance will care.
- Modal lacks focus trap.
- CSS carries unused transparent-nav state after header went always-solid.
- Footer nav omits AI Assistant entry.

## Questions to Consider

1. If the story is "60 years, same office," why no single year, face, or artifact?
2. The pillars get 300vh of theater while the conversion moment gets a phone number — what if case submission got the set piece?
3. Who is the ES copy for — voseo producer or usted-formal advisor? Pick one register.
