#!/usr/bin/env python3
"""
Comprehensive SEO/GEO/AEO Testing for JMLPH Landing Page
Tests: Meta tags, JSON-LD schemas, semantic HTML, FAQ section
"""

import requests
import json
import re
from bs4 import BeautifulSoup

BASE_URL = "https://medical-journal-hub-2.preview.emergentagent.com"

def get_page_content():
    """Fetch the page HTML content"""
    response = requests.get(BASE_URL, timeout=30)
    return response.text, BeautifulSoup(response.text, 'html.parser')

def extract_json_ld_scripts(soup):
    """Extract all JSON-LD scripts from the page"""
    scripts = soup.find_all('script', type='application/ld+json')
    schemas = []
    for script in scripts:
        try:
            data = json.loads(script.string)
            schemas.append(data)
        except:
            pass
    return schemas

def test_seo_meta_tags():
    """Test SEO meta tags"""
    print("\n" + "="*60)
    print("TESTING SEO META TAGS")
    print("="*60)
    
    html, soup = get_page_content()
    passed = 0
    failed = 0
    
    # Test 1: Enhanced meta description with ISSN
    desc = soup.find('meta', attrs={'name': 'description'})
    if desc and 'ISSN 2788-791X' in desc.get('content', ''):
        print("✓ PASS: Meta description contains ISSN 2788-791X")
        passed += 1
    else:
        print("✗ FAIL: Meta description missing or doesn't contain ISSN")
        failed += 1
    
    # Test 2: Extended keywords meta tag
    keywords = soup.find('meta', attrs={'name': 'keywords'})
    expected_keywords = ['medicine', 'law', 'public health', 'JMLPH', 'ARETION', 'peer-reviewed', 'open access']
    if keywords:
        content = keywords.get('content', '')
        found_all = all(kw.lower() in content.lower() for kw in expected_keywords)
        if found_all:
            print("✓ PASS: Extended keywords meta tag present with all expected terms")
            passed += 1
        else:
            print(f"✗ FAIL: Keywords missing some expected terms")
            failed += 1
    else:
        print("✗ FAIL: Keywords meta tag not found")
        failed += 1
    
    # Test 3: robots tag with max-snippet and max-image-preview
    robots = soup.find('meta', attrs={'name': 'robots'})
    if robots:
        content = robots.get('content', '')
        if 'max-snippet:-1' in content and 'max-image-preview:large' in content:
            print("✓ PASS: robots tag includes max-snippet:-1 and max-image-preview:large")
            passed += 1
        else:
            print(f"✗ FAIL: robots tag missing directives. Found: {content}")
            failed += 1
    else:
        print("✗ FAIL: robots meta tag not found")
        failed += 1
    
    # Test 4: Citation meta tags
    citation_tags = {
        'citation_journal_title': 'The Journal of Medicine, Law',
        'citation_issn': '2788-791X',
        'citation_publisher': 'ARETION Publishing Group'
    }
    for tag_name, expected_value in citation_tags.items():
        tag = soup.find('meta', attrs={'name': tag_name})
        if tag and expected_value in tag.get('content', ''):
            print(f"✓ PASS: {tag_name} present with correct value")
            passed += 1
        else:
            print(f"✗ FAIL: {tag_name} missing or incorrect")
            failed += 1
    
    # Test 5: Dublin Core meta tags
    dc_tags = {
        'DC.title': 'The Journal of Medicine, Law',
        'DC.publisher': 'ARETION Publishing Group',
        'DC.type': 'journal',
        'DC.language': 'en',
        'DC.identifier': 'ISSN: 2788-791X'
    }
    for tag_name, expected_value in dc_tags.items():
        tag = soup.find('meta', attrs={'name': tag_name})
        if tag and expected_value in tag.get('content', ''):
            print(f"✓ PASS: {tag_name} present with correct value")
            passed += 1
        else:
            print(f"✗ FAIL: {tag_name} missing or incorrect")
            failed += 1
    
    # Test 6: Enhanced OG tags with og:image:alt
    og_image_alt = soup.find('meta', attrs={'property': 'og:image:alt'})
    if og_image_alt and og_image_alt.get('content'):
        print(f"✓ PASS: og:image:alt present: {og_image_alt.get('content')[:50]}...")
        passed += 1
    else:
        print("✗ FAIL: og:image:alt meta tag not found")
        failed += 1
    
    # Test 7: Enhanced Twitter Card tags with twitter:image:alt
    twitter_image_alt = soup.find('meta', attrs={'name': 'twitter:image:alt'})
    if twitter_image_alt and twitter_image_alt.get('content'):
        print(f"✓ PASS: twitter:image:alt present: {twitter_image_alt.get('content')[:50]}...")
        passed += 1
    else:
        print("✗ FAIL: twitter:image:alt meta tag not found")
        failed += 1
    
    return passed, failed

def test_structured_data_schemas():
    """Test all 7 JSON-LD structured data schemas"""
    print("\n" + "="*60)
    print("TESTING STRUCTURED DATA (JSON-LD SCHEMAS)")
    print("="*60)
    
    html, soup = get_page_content()
    schemas = extract_json_ld_scripts(soup)
    
    passed = 0
    failed = 0
    
    print(f"Found {len(schemas)} JSON-LD schema blocks")
    
    # Test 1: Organization schema
    org_schema = next((s for s in schemas if s.get('@type') == 'Organization'), None)
    if org_schema:
        has_id = '@id' in org_schema
        has_logo = 'logo' in org_schema
        has_address = 'address' in org_schema
        has_contact = 'contactPoint' in org_schema
        has_sameas = 'sameAs' in org_schema
        
        if all([has_id, has_logo, has_address, has_contact, has_sameas]):
            print("✓ PASS: Organization schema with @id, logo, address, contactPoint, sameAs")
            passed += 1
        else:
            missing = []
            if not has_id: missing.append('@id')
            if not has_logo: missing.append('logo')
            if not has_address: missing.append('address')
            if not has_contact: missing.append('contactPoint')
            if not has_sameas: missing.append('sameAs')
            print(f"✗ FAIL: Organization schema missing: {missing}")
            failed += 1
    else:
        print("✗ FAIL: Organization schema not found")
        failed += 1
    
    # Test 2: Enhanced Periodical schema
    periodical_schema = next((s for s in schemas if s.get('@type') == 'Periodical'), None)
    if periodical_schema:
        has_audience = 'audience' in periodical_schema
        has_freq = 'publicationFrequency' in periodical_schema
        has_date = 'dateCreated' in periodical_schema
        
        if all([has_audience, has_freq, has_date]):
            print("✓ PASS: Periodical schema with audience, publicationFrequency, dateCreated")
            passed += 1
        else:
            missing = []
            if not has_audience: missing.append('audience')
            if not has_freq: missing.append('publicationFrequency')
            if not has_date: missing.append('dateCreated')
            print(f"✗ FAIL: Periodical schema missing: {missing}")
            failed += 1
    else:
        print("✗ FAIL: Periodical schema not found")
        failed += 1
    
    # Test 3: PublicationIssue schema with 8 ScholarlyArticle entries
    pub_issue_schema = next((s for s in schemas if s.get('@type') == 'PublicationIssue'), None)
    if pub_issue_schema:
        has_part = pub_issue_schema.get('hasPart', [])
        scholarly_articles = [p for p in has_part if p.get('@type') == 'ScholarlyArticle']
        
        if len(scholarly_articles) == 8:
            print(f"✓ PASS: PublicationIssue schema with 8 ScholarlyArticle entries in hasPart")
            passed += 1
        else:
            print(f"✗ FAIL: PublicationIssue has {len(scholarly_articles)} ScholarlyArticles, expected 8")
            failed += 1
    else:
        print("✗ FAIL: PublicationIssue schema not found")
        failed += 1
    
    # Test 4: WebSite schema with SearchAction
    website_schema = next((s for s in schemas if s.get('@type') == 'WebSite'), None)
    if website_schema:
        potential_action = website_schema.get('potentialAction', {})
        if potential_action.get('@type') == 'SearchAction':
            print("✓ PASS: WebSite schema with SearchAction")
            passed += 1
        else:
            print("✗ FAIL: WebSite schema missing SearchAction")
            failed += 1
    else:
        print("✗ FAIL: WebSite schema not found")
        failed += 1
    
    # Test 5: BreadcrumbList schema with 3 items
    breadcrumb_schema = next((s for s in schemas if s.get('@type') == 'BreadcrumbList'), None)
    if breadcrumb_schema:
        items = breadcrumb_schema.get('itemListElement', [])
        if len(items) == 3:
            print(f"✓ PASS: BreadcrumbList schema with 3 items")
            passed += 1
        else:
            print(f"✗ FAIL: BreadcrumbList has {len(items)} items, expected 3")
            failed += 1
    else:
        print("✗ FAIL: BreadcrumbList schema not found")
        failed += 1
    
    # Test 6: FAQPage schema with 8 question-answer pairs
    faq_schema = next((s for s in schemas if s.get('@type') == 'FAQPage'), None)
    if faq_schema:
        main_entity = faq_schema.get('mainEntity', [])
        questions = [q for q in main_entity if q.get('@type') == 'Question']
        
        if len(questions) == 8:
            print(f"✓ PASS: FAQPage schema with 8 question-answer pairs")
            passed += 1
        else:
            print(f"✗ FAIL: FAQPage has {len(questions)} questions, expected 8")
            failed += 1
    else:
        print("✗ FAIL: FAQPage schema not found")
        failed += 1
    
    # Test 7: Total schema count should be 7
    if len(schemas) == 7:
        print(f"✓ PASS: Total of 7 JSON-LD schema blocks present")
        passed += 1
    else:
        print(f"✗ FAIL: Found {len(schemas)} schemas, expected 7")
        failed += 1
    
    return passed, failed

def test_geo_semantic_html():
    """Test GEO semantic HTML features"""
    print("\n" + "="*60)
    print("TESTING GEO (SEMANTIC HTML)")
    print("="*60)
    
    html, soup = get_page_content()
    passed = 0
    failed = 0
    
    # Note: The main element and itemScope are in the React-rendered content
    # We need to check if they're present in the source or rendered
    
    # Test 1: Check for main element in App.js (semantic HTML)
    # Since this is a React app, the main element would be rendered client-side
    # We can verify it's in the source code
    
    # For now, let's check if the HTML structure is correct
    print("Note: Semantic HTML (main element, itemScope) is rendered client-side by React")
    print("Verifying presence in source code...")
    
    # Check App.js for main element
    try:
        with open('/app/frontend/src/App.js', 'r') as f:
            app_content = f.read()
            
        if '<main' in app_content:
            print("✓ PASS: <main> element found in App.js source")
            passed += 1
        else:
            print("✗ FAIL: <main> element not found in App.js")
            failed += 1
        
        if 'itemScope' in app_content and 'WebPage' in app_content:
            print("✓ PASS: WebPage itemScope found in App.js source")
            passed += 1
        else:
            print("✗ FAIL: WebPage itemScope not found in App.js")
            failed += 1
            
    except Exception as e:
        print(f"✗ FAIL: Could not read App.js: {e}")
        failed += 2
    
    return passed, failed

def test_aeo_faq_section():
    """Test AEO FAQ section features"""
    print("\n" + "="*60)
    print("TESTING AEO (FAQ SECTION)")
    print("="*60)
    
    passed = 0
    failed = 0
    
    # Check App.js for FAQ implementation
    try:
        with open('/app/frontend/src/App.js', 'r') as f:
            app_content = f.read()
        
        # Test 1: FAQ section with data-testid
        if 'data-testid="faq-section"' in app_content:
            print("✓ PASS: FAQ section with data-testid='faq-section' found")
            passed += 1
        else:
            print("✗ FAIL: FAQ section data-testid not found")
            failed += 1
        
        # Test 2: 8 FAQ items in faqData
        faq_count = app_content.count('"question":')
        if faq_count >= 8:
            print(f"✓ PASS: Found {faq_count} FAQ questions in faqData")
            passed += 1
        else:
            print(f"✗ FAIL: Found only {faq_count} FAQ questions, expected 8")
            failed += 1
        
        # Test 3: FAQ items have microdata attributes
        if 'itemScope' in app_content and 'itemProp="mainEntity"' in app_content:
            print("✓ PASS: FAQ items have microdata attributes (itemScope, itemProp)")
            passed += 1
        else:
            print("✗ FAIL: FAQ items missing microdata attributes")
            failed += 1
        
        # Test 4: FAQ accordion with animation (AnimatePresence)
        if 'AnimatePresence' in app_content and 'openIndex' in app_content:
            print("✓ PASS: FAQ accordion with animation (AnimatePresence) found")
            passed += 1
        else:
            print("✗ FAIL: FAQ accordion animation not found")
            failed += 1
        
        # Test 5: FAQ toggle buttons with data-testid
        if 'data-testid={`faq-toggle-' in app_content or "data-testid={`faq-toggle-" in app_content:
            print("✓ PASS: FAQ toggle buttons have data-testid attributes")
            passed += 1
        else:
            print("✗ FAIL: FAQ toggle buttons missing data-testid")
            failed += 1
        
        # Test 6: FAQPage schema type in section
        if 'itemType="https://schema.org/FAQPage"' in app_content:
            print("✓ PASS: FAQ section has FAQPage schema itemType")
            passed += 1
        else:
            print("✗ FAIL: FAQ section missing FAQPage schema itemType")
            failed += 1
            
    except Exception as e:
        print(f"✗ FAIL: Could not read App.js: {e}")
        failed += 6
    
    return passed, failed

def test_existing_features():
    """Test that existing features still work"""
    print("\n" + "="*60)
    print("TESTING EXISTING FEATURES")
    print("="*60)
    
    passed = 0
    failed = 0
    
    try:
        with open('/app/frontend/src/App.js', 'r') as f:
            app_content = f.read()
        
        features = [
            ('header', 'data-testid="header"'),
            ('hero-section', 'data-testid="hero-section"'),
            ('metrics-section', 'data-testid="metrics-section"'),
            ('about-section', 'data-testid="about-section"'),
            ('current-issue-section', 'data-testid="current-issue-section"'),
            ('submission-section', 'data-testid="submission-section"'),
            ('newsletter-section', 'data-testid="newsletter-section"'),
            ('contact-section', 'data-testid="contact-section"'),
            ('footer', 'data-testid="footer"'),
        ]
        
        for name, testid in features:
            if testid in app_content:
                print(f"✓ PASS: {name} section present")
                passed += 1
            else:
                print(f"✗ FAIL: {name} section missing")
                failed += 1
        
        # Check policy modals
        if 'PolicyModal' in app_content and 'policyDocuments' in app_content:
            print("✓ PASS: Policy modals present")
            passed += 1
        else:
            print("✗ FAIL: Policy modals missing")
            failed += 1
            
    except Exception as e:
        print(f"✗ FAIL: Could not read App.js: {e}")
        failed += 10
    
    return passed, failed

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("JMLPH SEO/GEO/AEO COMPREHENSIVE TEST SUITE")
    print("="*60)
    
    total_passed = 0
    total_failed = 0
    
    # Run all test suites
    p, f = test_seo_meta_tags()
    total_passed += p
    total_failed += f
    
    p, f = test_structured_data_schemas()
    total_passed += p
    total_failed += f
    
    p, f = test_geo_semantic_html()
    total_passed += p
    total_failed += f
    
    p, f = test_aeo_faq_section()
    total_passed += p
    total_failed += f
    
    p, f = test_existing_features()
    total_passed += p
    total_failed += f
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    total = total_passed + total_failed
    print(f"Total Tests: {total}")
    print(f"Passed: {total_passed}")
    print(f"Failed: {total_failed}")
    print(f"Success Rate: {(total_passed/total*100):.1f}%")
    
    return total_failed == 0

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
