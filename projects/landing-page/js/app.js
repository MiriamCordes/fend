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

const paragraph1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
const paragraph2 = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
const paragraphList = [paragraph1, paragraph2]

const mainContent = document.querySelector('main');

// class to hold the section data
class Section {
    constructor(id, dataNav, header, paragraphs) {
        this.id = id;
        this.dataNav = dataNav;
        this.header = header;
        this.paragraphs = paragraphs;
    }
}

// list of sections
const sections = [
    new Section(id = "section1", dataNav = "Section 1", header = "Section 1", paragraphs = paragraphList),
    new Section(id = "section2", dataNav = "Section 2", header = "Section 2", paragraphs = paragraphList),
    new Section(id = "section3", dataNav = "Section 3", header = "Section 3", paragraphs = paragraphList),
    new Section(id = "section4", dataNav = "Section 4", header = "Section 4", paragraphs = paragraphList),
    new Section(id = "section5", dataNav = "Section 5", header = "Section 5", paragraphs = paragraphList)
];

// create section element
function buildSectionElement(section) {
    const sectionElement = document.createElement('section');
    sectionElement.id = section.id;
    sectionElement.dataNav = section.dataNav;
    // initially set the first section as active
    if (section.id == "section1") {
        sectionElement.classList.add("your-active-class");
    }
    return sectionElement;
}

// create wrapper div element
function buildWrapperElement() {
    const wrapperElement = document.createElement('div');
    wrapperElement.className = "landing__container";
    return wrapperElement;
}

// create header element
function buildHeaderElement(headerText) {
    const headerElement = document.createElement('h2');
    headerElement.textContent = headerText;
    return headerElement;
}

// create paragraph elements
function buildParagraphElements(paragraphs) {
    const paragraphFragment = document.createDocumentFragment();
    for (const paragraph of paragraphs) {
        paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph;
        paragraphFragment.appendChild(paragraphElement);
    }
    return paragraphFragment;
}

// build html elements and add them to the html
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
    mainContent.append(sectionFragment);
}

// build navbar elements
function buildNavbarElement(section) {
    const navbarElement = document.createElement('li');
    const anchorElement = document.createElement('a');
    anchorElement.className = "menu__link"
    anchorElement.textContent = section.header;
    navbarElement.append(anchorElement);
    return navbarElement;
}

// build navbar elements and add them to the html
function buildNavbar() {
    const navbar = document.getElementById('navbar__list');
    const navbarFragment = document.createDocumentFragment();
    for (const section of sections) {
        const navbarElement = buildNavbarElement(section);
        navbarFragment.appendChild(navbarElement);
    }
    navbar.append(navbarFragment);
}

// handle click on navbar elemennt
function onNavbarElementClicked(event) {
    event.preventDefault();
    const sectionToScrollTo = sections.find(function (section) {
        return section.dataNav == event.target.textContent;
    })
    // scroll to anchor ID using scrollTO event
    const sectionElementToScrollTo = document.getElementById(sectionToScrollTo.id);
    sectionElementToScrollTo.scrollIntoView({ behavior: "smooth" });
}

// highlight navbar element corresponding to active section
function highlightNavBarElement() {
    const navbarElements = document.getElementsByTagName('a');
    const activeSectionElement = document.querySelector(".your-active-class")
    if (activeSectionElement == null) return;
    for (navbarElement of navbarElements) {
        if (navbarElement.parentElement.nodeName != "LI") {
            continue;
        }
        if (navbarElement.textContent != activeSectionElement.querySelector("h2").textContent) {
            navbarElement.classList.remove("menu__link__active");
        } else {
            navbarElement.classList.add("menu__link__active");
        }
    }
}

// handle document scrolled
function onDocumentScrolled() {
    const sectionElements = document.getElementsByTagName('section');
    for (const sectionElement of sectionElements) {
        const box = sectionElement.getBoundingClientRect();
        // add class 'active' to section when near top of viewport
        if (box.top <= 150 && box.bottom >= 150) {
            sectionElement.classList.add("your-active-class");
        } else {
            sectionElement.classList.remove("your-active-class");
        }
    }
    highlightNavBarElement();
}

// set up event listeners for document scroll and navbar item click
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


