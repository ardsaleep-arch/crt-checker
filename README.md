# CRT Checker

A static web app that solves systems of congruences with the Chinese Remainder Theorem, shows the working step by step, and verifies the answer (including an optional "check my answer" box).

- Exact arithmetic with `BigInt`
- Handles non-coprime moduli (generalized CRT) and detects inconsistent systems
- English / Thai interface

## Run locally

Open `index.html` in a browser, or serve it: `python3 -m http.server`.

## Tests

`node crt.test.js`
