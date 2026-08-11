# Inari Website Redesign --- Decision Context

**Status:** Working decision record\
**Purpose:** Record why the current design direction was selected before
implementation

## 1. Why We Are Redesigning Instead of Reproducing the Current Website

The existing Inari website provides the functional baseline for the
project. It shows the important customer journeys and operational
content that should not be lost during redevelopment.

However, recreating its current page layouts exactly would limit the
opportunity to improve the digital expression of the brand.

**Decision:** Preserve required functionality and verified content, but
do not treat the current layout as the visual source of truth.

## 2. What Is the Primary Source of Visual Direction?

The redesign should be based on the established Inari identity rather
than on generic Japanese restaurant conventions.

The working priority is:

1.  official Inari logo and brand assets;
2.  established Inari brand material and guidelines;
3.  the physical restaurant environment;
4.  current website content and functionality;
5.  the new digital design system.

**Reason:** This lets the website evolve without accidentally becoming a
rebrand.

## 3. Why the Logo and Kitsune Are Foundational

The logo and kitsune are distinctive existing assets that make Inari
recognisable.

**Decision:** Treat them as core identity elements, not decoration.

**Rejected direction:** Replacing the identity with a plain text
wordmark or newly invented Japanese symbols.

## 4. Why We Are Keeping the Existing Colour Identity

The established red, black, and white palette already provides strong
visual recognition.

**Decision:** Build the interface around those colours and introduce
only restrained supporting neutrals when necessary.

**Rejected direction:** Introducing a new dominant accent palette merely
to make the redesign look different.

**Reason:** A redesign should create differentiation through
composition, typography, photography, interaction, and hierarchy before
introducing new brand colours.

## 5. Why Typography Needs Special Attention

The logo has a distinctive character. A generic luxury restaurant font
combination could make the surrounding website feel unrelated to it.

**Decision:** Establish a display type role that complements the
existing brand and a separate functional type role for interface
readability.

The original brand typeface should be identified before selecting a
substitute.

**Rejected direction:** Using stereotypical Japanese brush or decorative
Asian-style fonts.

**Reason:** Japanese identity should come from Inari's actual brand,
food, photography, and story rather than visual clichés.

## 6. Why Negative Space Is Important

A limited photography library can tempt the design to place images
everywhere.

That would make repeated dishes more noticeable and reduce the impact of
the strongest photographs.

**Decision:** Use negative space as an active part of the composition.

**Reason:** Fewer, stronger visual moments make both the brand and
photography feel more intentional.

## 7. Why We Chose "Tradition × Rebellion" as a Design Principle

Inari should feel refined without becoming overly formal, and playful
without becoming chaotic.

**Decision:** Use "Tradition × Rebellion" as an internal design test.

For each major composition, combine a controlled element with one less
expected element.

Examples:

-   grid + unusual crop;
-   whitespace + oversized type;
-   restrained navigation + strong red moment;
-   precise food photography + unconventional placement.

This is a design principle, not necessarily public website copy.

## 8. Why We Are Not Building the Site Around a Large Autoplay Gallery

The available photo library contains several variations of similar
dishes.

A conventional long carousel would expose that repetition and give every
photograph similar importance.

**Decision:** Curate a smaller set of hero/signature images and use the
remaining images in editorial or user-controlled gallery structures.

**Reason:** This makes a limited image library feel deliberate rather
than incomplete.

## 9. Why Chef Photography Is Important

The available assets include several photographs of chefs and
preparation.

**Decision:** Give these images a dedicated craft/kitchen role instead
of using only finished food photography.

**Reason:** They provide human presence, process, and visual variety
while reducing dependence on a large collection of interior or lifestyle
photography.

## 10. Why We Are Not Generating Replacement Food Photography

AI-generated food images could increase visual quantity but could also
imply dishes, plating, ingredients, or experiences that customers do not
actually receive.

**Decision:** Prefer authentic Inari photography for all representations
of actual food, staff, and venue experiences.

Generated visual assets, if ever used, should be limited to clearly
decorative/non-representational material.

## 11. Why Booking Remains an Existing Service

The purpose of the website project is not to create a reservation
platform.

**Decision:** Preserve the existing booking provider unless the business
separately decides to replace it.

**Reason:** Development effort should focus on the website experience
and make the existing booking path easier to reach.

## 12. Why Booking Gets Greater Visual Priority

For a restaurant website, viewing the menu and booking a table are among
the most important customer actions.

**Decision:** Treat **Book a Table** as the primary conversion action
across desktop and mobile.

This can include persistent or repeated booking access where it remains
unobtrusive.

## 13. Why Menu Discovery Should Improve

The menu is an important decision point for potential customers.

**Decision:** Use selected photography and category-level storytelling
to introduce the menu, while preserving fast access to the actual
current food and drink information.

**Reason:** The visual layer should create appetite, but it must not
make customers work harder to find practical information.

## 14. Why Promotions Should Be Configurable

Restaurant promotions and special service information change more often
than the main website design.

**Decision:** Separate temporary announcements from permanent layout
where practical.

**Reason:** Staff or developers should be able to update or disable a
promotion without modifying multiple page components.

## 15. Why We Are Delaying Technology Choices

A visual and functional brief should define what the website must
achieve before framework-specific implementation decisions constrain the
design.

**Decision:** Do not lock the project description to Next.js, React, a
specific CMS, or an animation library yet.

**Reason:** The next implementation-planning session can choose
technology based on the approved experience, content-update
requirements, deployment environment, and maintenance expectations.

## 16. Why We Are Not Inventing Missing Business Information

Some desirable website sections may require information that is not
currently available, such as function capacity or package details.

**Decision:** Use placeholders during development where necessary and
publish only verified information.

**Reason:** Improving presentation must not create inaccurate restaurant
information.

## 17. Overall Decision

The project is a **digital redesign, not a brand redesign**.

We will preserve the recognisable Inari identity and current customer
functions while improving:

-   hierarchy;
-   typography;
-   photography curation;
-   responsive behaviour;
-   menu discovery;
-   booking visibility;
-   functions presentation;
-   maintainability;
-   accessibility;
-   performance.

Implementation decisions will be made after the project description and
this decision record are reviewed.
