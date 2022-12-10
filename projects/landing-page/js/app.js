/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const paragraph1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
const paragraph2 = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
const paragraphList = [paragraph1, paragraph2]

const mainContent = document.querySelector('main');

class Section {
    constructor(id, dataNav, isActive, header, paragraphs) {
        this.id = id;
        this.dataNav = dataNav;
        this.isActive = isActive;
        this.header = header;
        this.paragraphs = paragraphs;
    }
}

const sections = [
    new Section(id = "section1", dataNav = "Section 1", isActive = true, header = "Section 1", paragraphs = paragraphList),
    new Section(id = "section2", dataNav = "Section 2", isActive = false, header = "Section 2", paragraphs = paragraphList),
    new Section(id = "section3", dataNav = "Section 3", isActive = false, header = "Section 3", paragraphs = paragraphList),
    new Section(id = "section4", dataNav = "Section 4", isActive = false, header = "Section 4", paragraphs = paragraphList),
    new Section(id = "section5", dataNav = "Section 5", isActive = false, header = "Section 5", paragraphs = paragraphList)
];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function buildSectionElement(section) {
    const sectionElement = document.createElement('section');
    sectionElement.id = section.id;
    sectionElement.dataNav = section.dataNav;
    if (section.isActive) {
        sectionElement.className = "your-active-class";
    }
    return sectionElement;
}

function buildWrapperElement() {
    const wrapperElement = document.createElement('div');
    wrapperElement.className = "landing__container";
    return wrapperElement;
}

function buildHeaderElement(headerText) {
    const headerElement = document.createElement('h2');
    headerElement.textContent = headerText;
    return headerElement;
}

function buildParagraphElements(paragraphs) {
    const paragraphFragment = document.createDocumentFragment();
    for (const paragraph of paragraphs) {
        paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph;
        paragraphFragment.appendChild(paragraphElement);
    }
    return paragraphFragment;
}

function buildSections() {
    const sectionFragment = document.createDocumentFragment();
    for (const section of sections) {
        const sectionElement = buildSectionElement(section);
        const wrapperElement = buildWrapperElement();
        const headerElement = buildHeaderElement(section.header);
        wrapperElement.appendChild(headerElement)
        const paragraphs = buildParagraphElements(section.paragraphs)
        wrapperElement.appendChild(paragraphs);
        sectionElement.appendChild(wrapperElement);
        sectionFragment.appendChild(sectionElement)
    }
    mainContent.appendChild(sectionFragment);
}

function buildNavbarElement(section) {
    const navbarElement = document.createElement('li');
    const anchorElement = document.createElement('a');
    anchorElement.className = "menu__link"
    anchorElement.textContent = section.header;
    navbarElement.appendChild(anchorElement);
    return navbarElement;
}

function buildNavbar() {
    const navbar = document.getElementById('navbar__list');
    const navbarFragment = document.createDocumentFragment();
    for (const section of sections) {
        const navbarElement = buildNavbarElement(section);
        navbarFragment.appendChild(navbarElement);
    }
    navbar.appendChild(navbarFragment);
}

function onNavbarElementClicked(event) {
    const sectionToScrollTo = sections.find(function (section) {
        return section.dataNav == event.target.textContent;
    })
    const sectionElementToScrollTo = document.getElementById(sectionToScrollTo.id);
    sectionElementToScrollTo.scrollIntoView({ behavior: "smooth" });
}

function highlightNavBarElement(sectionElement) {
    const navbarElements = document.getElementsByTagName('a');
    for (navbarElement of navbarElements) {
        if (navbarElement.parentElement.nodeName != "LI") {
            continue;
        }
        if (navbarElement.textContent != sectionElement.querySelector("h2").textContent) {
            console.log("active " + navbarElement);
            navbarElement.classList.remove("menu__link__active");
        } else {
            console.log("not active");
            navbarElement.classList.add("menu__link__active");
        }
    }
}

function onDocumentScrolled(event) {
    const sectionElements = document.getElementsByTagName('section');
    for (const sectionElement of sectionElements) {
        const box = sectionElement.getBoundingClientRect();
        if (box.top <= 150 && box.bottom >= 150) {
            sectionElement.classList.add("your-active-class");
        } else {
            sectionElement.classList.remove("your-active-class");
        }
    }
    highlightNavBarElement(sectionElement);
}

function setUpEventListeners() {
    const navbarElements = document.getElementsByTagName('li');
    for (const navbarElement of navbarElements) {
        navbarElement.addEventListener('click', onNavbarElementClicked);
    }
    document.addEventListener('scroll', onDocumentScrolled);
}

buildSections();
buildNavbar();
setUpEventListeners();



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


