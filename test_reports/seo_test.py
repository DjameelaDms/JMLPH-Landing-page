#!/usr/bin/env python3
"""SEO and JSON-LD Structured Data Tests for JMLPH Landing Page"""

import requests
import re
import json

BASE_URL = "https://medical-journal-hub-2.preview.emergentagent.com"

def test_seo_meta_tags():
    """Test all SEO meta tags are present and correct"""
    response = requests.get(BASE_URL, timeout=30)
    html = response.text
    
    tests_passed = 0
    tests_failed = 0
    results = []
    
    # Test 1: Meta description
    if 'name="description" content="The Journal of Medicine, Law & Public Health (JMLPH)' in html:
        results.append("✓ PASSED: Meta description tag present with JMLPH journal description")
        tests_passed += 1
    else:
        results.append("✗ FAILED: Meta description tag missing or incorrect")
        tests_failed += 1
    
    # Test 2: Meta keywords
    if 'name="keywords" content="medicine, law, public health, medical law, ethics, peer-reviewed, open access, JMLPH, ARETION' in html:
        results.append("✓ PASSED: Meta keywords tag present with relevant terms")
        tests_passed += 1
    else:
        results.append("✗ FAILED: Meta keywords tag missing or incorrect")
        tests_failed += 1
    
    # Test 3: Meta author
    if 'name="author" content="ARETION Publishing Group"' in html:
        results.append("✓ PASSED: Meta author tag says 'ARETION Publishing Group'")
        tests_passed += 1
    else:
        results.append("✗ FAILED: Meta author tag missing or incorrect")
        tests_failed += 1
    
    # Test 4: Meta robots
    if 'name="robots" content="index, follow"' in html:
        results.append("✓ PASSED: Meta robots tag is 'index, follow'")
        tests_passed += 1
    else:
        results.append("✗ FAILED: Meta robots tag missing or incorrect")
        tests_failed += 1
    
    # Test 5: Canonical link
    if 'rel="canonical" href="https://www.jmlph.net"' in html:
        results.append("✓ PASSED: Canonical link points to https://www.jmlph.net")
        tests_passed += 1
    else:
        results.append("✗ FAILED: Canonical link missing or incorrect")
        tests_failed += 1
    
    # Test 6: Open Graph tags
    og_tags = [
        ('og:type', 'website'),
        ('og:title', 'JMLPH — The Journal of Medicine, Law & Public Health'),
        ('og:description', 'An interdisciplinary, peer-reviewed, open access journal'),
        ('og:url', 'https://www.jmlph.net'),
        ('og:site_name', 'ARETION Publishing Group'),
        ('og:image', 'https://www.jmlph.net/public/journals/1/homepageImage_en_US.jpg'),
        ('og:locale', 'en_US')
    ]
    
    og_passed = 0
    for prop, expected in og_tags:
        if f'property="{prop}"' in html and expected in html:
            og_passed += 1
    
    if og_passed == len(og_tags):
        results.append(f"✓ PASSED: All {len(og_tags)} Open Graph meta tags present")
        tests_passed += 1
    else:
        results.append(f"✗ FAILED: Only {og_passed}/{len(og_tags)} Open Graph tags found")
        tests_failed += 1
    
    # Test 7: Twitter Card tags
    twitter_tags = [
        ('twitter:card', 'summary_large_image'),
        ('twitter:title', 'JMLPH — The Journal of Medicine, Law & Public Health'),
        ('twitter:description', 'An interdisciplinary, peer-reviewed, open access journal'),
        ('twitter:image', 'https://www.jmlph.net/public/journals/1/homepageImage_en_US.jpg')
    ]
    
    twitter_passed = 0
    for name, expected in twitter_tags:
        if f'name="{name}"' in html and expected in html:
            twitter_passed += 1
    
    if twitter_passed == len(twitter_tags):
        results.append(f"✓ PASSED: All {len(twitter_tags)} Twitter Card meta tags present")
        tests_passed += 1
    else:
        results.append(f"✗ FAILED: Only {twitter_passed}/{len(twitter_tags)} Twitter Card tags found")
        tests_failed += 1
    
    # Test 8: JSON-LD scripts count
    jsonld_count = html.count('type="application/ld+json"')
    if jsonld_count >= 2:
        results.append(f"✓ PASSED: {jsonld_count} JSON-LD scripts present in page head")
        tests_passed += 1
    else:
        results.append(f"✗ FAILED: Only {jsonld_count} JSON-LD scripts found (expected 2)")
        tests_failed += 1
    
    # Test 9: JSON-LD Periodical schema
    if '"@type": "Periodical"' in html or '"@type":"Periodical"' in html:
        if '"name": "The Journal of Medicine, Law & Public Health"' in html:
            if '"issn": ["2788-791X", "2788-9815"]' in html:
                if '"name": "ARETION Publishing Group"' in html:
                    results.append("✓ PASSED: JSON-LD Periodical schema with JMLPH details, ISSN, publisher info")
                    tests_passed += 1
                else:
                    results.append("✗ FAILED: JSON-LD Periodical missing publisher info")
                    tests_failed += 1
            else:
                results.append("✗ FAILED: JSON-LD Periodical missing ISSN")
                tests_failed += 1
        else:
            results.append("✗ FAILED: JSON-LD Periodical missing journal name")
            tests_failed += 1
    else:
        results.append("✗ FAILED: JSON-LD Periodical schema not found")
        tests_failed += 1
    
    # Test 10: JSON-LD PublicationIssue schema
    if '"@type": "PublicationIssue"' in html or '"@type":"PublicationIssue"' in html:
        if '"issueNumber": "2"' in html and '"volumeNumber": "6"' in html:
            results.append("✓ PASSED: JSON-LD PublicationIssue schema with volume 6, issue 2")
            tests_passed += 1
        else:
            results.append("✗ FAILED: JSON-LD PublicationIssue missing volume/issue numbers")
            tests_failed += 1
    else:
        results.append("✗ FAILED: JSON-LD PublicationIssue schema not found")
        tests_failed += 1
    
    # Test 11: Browser tab title
    if '<title>ARETION Publishing Group</title>' in html:
        results.append("✓ PASSED: Browser tab title is 'ARETION Publishing Group'")
        tests_passed += 1
    else:
        results.append("✗ FAILED: Browser tab title incorrect")
        tests_failed += 1
    
    return tests_passed, tests_failed, results

if __name__ == "__main__":
    print("=" * 60)
    print("SEO and JSON-LD Structured Data Tests")
    print("=" * 60)
    
    passed, failed, results = test_seo_meta_tags()
    
    for r in results:
        print(r)
    
    print("=" * 60)
    print(f"TOTAL: {passed} passed, {failed} failed")
    print("=" * 60)
