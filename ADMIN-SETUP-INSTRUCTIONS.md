# MZ Marketing Agency — Admin Panel Setup Guide

This guide is written in plain, non-technical language. Follow it once, in order,
and your Admin Panel will work for good. You will not need to touch any code.

--------------------------------------------------------------------------------
## PART 1 — Upload the files
--------------------------------------------------------------------------------

1. Unzip the file you downloaded from Claude.
2. Upload every file and folder inside it to your GitHub repository, in the
   exact same folder structure (don't rename or move anything).
3. If your site is already connected to Netlify (deploys automatically when
   you push to GitHub), Netlify will detect the new files and redeploy your
   site automatically within a minute or two. You don't need to do anything
   else in Netlify for this step.

--------------------------------------------------------------------------------
## PART 2 — Turn on the Admin Panel (one-time setup, about 5 minutes)
--------------------------------------------------------------------------------

The Admin Panel needs two switches turned on inside your Netlify account
before it will work. This is a one-time step.

1. Log in to **netlify.com** and open your site.
2. In the left-hand menu, click **"Identity"**.
3. Click **"Enable Identity"**.
4. Still on the Identity page, click **"Settings and usage"**, scroll to
   **"Registration"**, and set it to **"Invite only"**.
   (This stops random people from signing themselves up as admins.)
5. Scroll down to **"Services" → "Git Gateway"** and click **"Enable Git
   Gateway"**. This is what lets the Admin Panel save your changes directly
   to your GitHub repository.
6. Back on the main Identity page, click **"Invite users"**, type in your own
   email address, and send yourself the invite.
7. Check your email. Open the invite email and click the link inside it.
   It will take you to your website and pop up a box asking you to set a
   password. **Choose your own password here** — this is your real Admin
   Panel login from now on (see the note below about why we can't set this
   for you in advance).

That's it. Setup is done and will never need to be repeated.

--------------------------------------------------------------------------------
## PART 3 — Logging in from now on
--------------------------------------------------------------------------------

1. Go to **yourdomain.com/admin/** in your browser.
2. Click **"Log in with Netlify Identity"**.
3. Enter the email and password you set up in Part 2, Step 7.
4. You'll land on the Admin Panel dashboard with clearly labeled sections:
   - 🏠 Site Text & Contact Info
   - 🛠️ Services & Pricing
   - 🏆 Awards & Achievements
   - 💼 Portfolio Projects
   - 🎨 Site Color Theme

--------------------------------------------------------------------------------
## PART 4 — A note about the "admin / Admin@123" login you asked for
--------------------------------------------------------------------------------

You asked for a ready-made username and password so you could log in
immediately for testing. Here's the honest reason that's not possible, and
what you get instead, which is actually more secure:

A real password-protected admin panel needs somewhere secure to check your
password against; that "somewhere" is Netlify's own login system
(Netlify Identity), which only I don't have access to your Netlify account,
so I can't create that login for you in advance. Any password I could set
without your account would have to live in a plain file I hand you, which
means anyone who ever saw that file would have full access to edit your live
website. That's not actually password-protected, it just looks like it is.

The 5-minute setup in Part 2 is the real equivalent: it takes about the same
effort as typing in a password, and afterwards you have a genuine, private
login that only you control.

**Once you've completed Part 2, immediately note down the email and password
you chose somewhere safe. Change it any time from the Identity tab in your
Netlify dashboard if you ever want to update it.**

--------------------------------------------------------------------------------
## PART 5 — How saving changes works
--------------------------------------------------------------------------------

- Every edit you make in the Admin Panel and click "Publish" on is saved as a
  real update to your GitHub repository.
- Netlify sees that update and automatically rebuilds and redeploys your
  live site. This normally takes 30–90 seconds.
- You don't need to do anything else. No FTP, no manual file uploads, no code.
- The Color Theme switcher works the same way: pick a theme and publish, and
  every page on the live site re-colors itself within about a minute.

--------------------------------------------------------------------------------
## PART 6 — What's editable, and what isn't (yet)
--------------------------------------------------------------------------------

**Editable from the Admin Panel right now:**
- Home page hero headline, subheading, and tagline
- About page intro, "Our Story" text, and Founder name/title/photo
- Services page intro text, plus every service's title, description, icon and price
- Awards & Achievements (add/remove freely, hidden automatically when empty)
- Portfolio page intro text and every portfolio project (title, category,
  location, description, thumbnail image, live preview link, and whether it
  appears in the Home Page's Featured Work section)
- Contact email, WhatsApp number, phone number, location, and social links
  (these update everywhere they appear across the site, including every
  WhatsApp button and the floating WhatsApp icon)
- Website logo (navigation + footer) and Founder profile photo
- The site-wide color theme (4 presets)

**Not wired to the Admin Panel yet** (still edited in the page files directly,
same as before): testimonials, FAQ answers, and the Privacy Policy / Terms &
Conditions pages. If you'd like any of these made editable too, just ask and
I'll add them the same way.

--------------------------------------------------------------------------------
## PART 7 — If something looks wrong

- If /admin/ shows a blank page: double check both Identity and Git Gateway
  are enabled (Part 2, steps 3 and 5).
- If your saves don't seem to appear on the live site: give it 1–2 minutes
  for Netlify to rebuild, then check the "Deploys" tab in Netlify to confirm
  a new deploy ran.
- If Netlify shows a build error mentioning "branch": open
  `admin/config.yml` and confirm the `branch:` value matches your GitHub
  repo's actual default branch name (usually `main`, sometimes `master`).
