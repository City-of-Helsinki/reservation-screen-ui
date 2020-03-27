# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [Unreleased]

## [0.1.0] - 2020-03-27
### Added
- Add calendar which allows to see reservations for the entire day; replaces free slot time listing ([#16](https://github.com/City-of-Helsinki/reservation-screen-ui/pull/16))
- Add integrations to KuVa infrastructure; replaces Evermade's infrastructure ([#14](https://github.com/City-of-Helsinki/reservation-screen-ui/pull/14))
- Add support for week view in the calendar ([#17](https://github.com/City-of-Helsinki/reservation-screen-ui/pull/17))
- Show max reservation time and people capacity (f0c1371b)
- Add quick booking; user can control the amount of time they want to reserve ([#18](https://github.com/City-of-Helsinki/reservation-screen-ui/pull/18))
- Add support for one hour slot size (0aaf3ec0fa)
- Scroll calendar as time passes (e60b1fa0)
- Show "free to use" description for resources that can't be booked (101f32ed)
- Hides reservation controls for resources that require confirmation (7cc8055b15)
- Hides reservation controls for resources that have a max_price (7cc8055b15)

### Changed
- Update lint settings (2759dcb, f94b0327)
- Upgrade minimum Node version to 12 (a5b7fdc5)
- Update tests to not depend on timezone (adb9a728)
- Upgrade React into version that supports hooks (b086aaaa, b7998065, a5a0bab3)
- Move LocalToggle under clock (90db427e)
- Upgrade Babel into branch 7 (a8828f59)
- Make small UI tweaks (dfd0bd6f, e6a55db8, 3006f5a9, 5347378c, aa52eb49, 74e3a8ae52)

### Fixed
- Fix missing translations for Swedish and English (b51f5406, 8d45d6cc, f3220c88, a1a5628f)
- Use correct translations for resource names and descriptions (da5b0ef4, 11fcc8a0)
- Fix lint warnings (0dfd334c)
- Fix travis config (8b4766fc)
- Fix reservation of resources that require all fields (594c12d3)
- Fix warnings about failed source map parses on Chrome (a6d7b08e)

### Security
- Resolve critical security vulnerabilities (ce01634c)
- Resolve security vulnerabilities (a8828f59)

## [0.0.1] ~2019-01

The 1.0.0 branch of this software is considered to be the version that Evermade created and finished more or less last January. This was the initial version and no changelog was kept.