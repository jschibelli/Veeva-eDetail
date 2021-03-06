from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import unittest, time, re, sys, logging, urlparse, urllib2, collections, json

from bs4 import BeautifulSoup

debug = True
log = logging.getLogger()

class Link_Crawler(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Remote(command_executor=browserstack_hub_url, desired_capabilities=desired_browser)
        self.driver.implicitly_wait(30)
        self.base_url = content_url
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_crawl_wesbite_for_broken_links(self):
        links = []
        self.root_url = ''
        
        if 'index' in self.base_url:
            self.root_url = self.base_url.split('index')[0]

        driver = self.driver
        driver.get(self.base_url)
        links = self.crawl_site_for_links()

        self.screenshot_all_links(links)

        if debug:
            print links

    def crawl_site_for_links(self):
        driver = self.driver
        links = []
        links.append(self.base_url)
        links_visited = []
        links_visited.append(self.base_url)

        links += self.strip_links_from_page(driver.page_source)

        while (collections.Counter(links_visited) == collections.Counter(links)) == False:
            for link in links:
                if self.base_url not in link and link not in links_visited:
                    links_visited.append(link)
                    break
                if link not in links_visited:
                    links_visited.append(link)
                    self.change_page(link)
                    links += self.strip_links_from_page(driver.page_source)
                    break

            links = self.remove_duplicates_from_array(links)

        return links

    def remove_duplicates_from_array(self, array):
        seen = set()
        seen_add = seen.add
        return [ x for x in array if not (x in seen or seen_add(x))]

    def change_page(self, page):
        driver = self.driver
        driver.get(page)

    def strip_links_from_page(self, html):
        links = []

        soup = BeautifulSoup(html)
        results = soup.find_all('a')

        for link in results:
            new_link = link.get('href')

            try:
                if 'mailto' in new_link:
                    continue
            except:
                if debug:
                    print 'None Found' + str(new_link)
                continue


            links.append(new_link)

        return self.normalize_links(links)

    def normalize_links(self, links):
        fixed_links = []

        for link in links:
            if None == link:
                continue
            if 'http' not in link:
                link = urlparse.urljoin(self.base_url, link)

            fixed_links.append(link)

        return fixed_links

    def screenshot_all_links(self, links):
        screenshot_num = 0
        driver = self.driver

        print 'base url' + str(self.base_url)
        for url in links:
            if debug and self.base_url in url:
                print u'Screenshotting page %s' % (url)

            if self.root_url in url:

                driver.get(url)

                name = ''
                try:
                    name += u'%s-%s_%s-%s_%s' % (desired_browser['os'],desired_browser['os_version'],desired_browser['browser'],desired_browser['browser_version'],str(screenshot_num))
                except:
                    name += str(screenshot_num)
                driver.save_screenshot(screenshot_directory + 'screenshot_' + name + '.png')
                screenshot_num = screenshot_num + 1


    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

desired_browser = sys.argv[1]
content_url = sys.argv[2]
browserstack_hub_url = sys.argv[3]
screenshot_directory = sys.argv[4]
del sys.argv[1:]

desired_browser = json.loads(desired_browser)
if debug:
    print "Desired Capabilities " + str(desired_browser)
    print "Content URL: " + str(content_url)
    print "Browserstack Hub Url: " + str(browserstack_hub_url)
    print "Screenshot Directory: " + str(screenshot_directory)



#if desired_browser == 'chrome':
#    current_browser = DesiredCapabilities.CHROME
#elif desired_browser == 'firefox':
#    current_browser = DesiredCapabilities.FIREFOX
#elif desired_browser == 'safari':
#    current_browser = DesiredCapabilities.SAFARI

if __name__ == "__main__":
    unittest.main()