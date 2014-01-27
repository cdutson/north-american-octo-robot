north-american-octo-robot
=========================

This plugin is an answer for requiring comments on various portions of projects I work on. I wanted something that would:

 - easily display a comment modal (stand alone or with feed)
 - allow the comment modal to be loaded a variety of ways
 - pull in comments from a json feed
 - pull in comments from a passed-in json object
 - render comment feed using Hogan (which then allows for differing json structures)
 - push new comment to a source
 - return new comment as json object
 - utilize custom events to allow external hooks
 
The plugin will lazy-initialize a comment modal if no options are passed, or if you try and perform an action against a link without setting it up before hand.

(Git recommended the repo name)

------------

## Example usages

I'll fill this out with more example as they start to exist.

```javascript
/* 
 The following will add click events that attach to the element.
 It will also do all the basic initialization (dumping the default comment modal
 to the page, and getting it all hooked up.
*/
$('element').commentModal();

/* 
 You can perform a variety of actions directly against an element.
 In this case this code will set up the comment modal for that element, and then 
 perform a 'show' action (showing the modal). This will load in comments
 from whatever url is set to the element (data-fetch, or href[default]).
*/
$('element').commentModal('show');

// show a comment modal with 

// hides the comment modal attached to that element if it's visible
$('element').commentModal('hide');

// Passes some initialization options to the modal
$('element').commentModal({'comment-template':'<li>{{comment}} - {{author}}</li>'});
```

## Properties
Fill this in as they start to exist

## Exposed functions
Variations of initialization:
- [ ] $.commentModal() // creates a default comment modal on the body
- [ ] $.commentModal({options}) //override options, comment modal attached to body
- [ ] $.commentModal({options}, $target) // override options, uses existing modal
- [ ] $(el).commentModal() // default comment modal attached to element
- [ ] $(el).commentModal({options}) // override options, attach to element
- [ ] $(el).commentModal({options}, $target) // override options, attach to element, use target as modal

Variations of the open command:
- [ ] $.commentModal('open') // opens the default modal but doesn't do anything
- [ ] $.commentModal('open', {options}, {jsonObj})
- [ ] $(el).commentModal('open') // opens the modal for that element

Variations of the load command: (only runs when the modal is open)
- [ ] $.commentModal('load', {json:json}) // json will take presidence 
- [ ] $.commentModal('load', {url:url, method:method, data:data})
- [ ] $(el).commentModal('load') // use values set on or with element
- [ ] $(el).commentModal('load', url)
- [ ] $(el).commentModal('load', {json})
- [ ] $(el).commentModal('load', {url:url, method:method, data:data})

Variations of submit command: (only runs when the modal is open)
- [ ] $.commentModal('submit') // returns a json object
- [ ] $.commentModal('submit', url)
- [ ] $.commentModal('submit', {url:url, method:method, data:data})
- [ ] $(el).commentModal('submit') // use values set on or with element
- [ ] $(el).commentModal('submit', url)
- [ ] $(el).commentModal('submit', {url:url, method:method, data:data})

Variations of the close command:
- [ ] $.commentModal('close') // closes and scrubs the currently opened modal
- [ ] $(el).commentModal('close') // closes the modal for that element and scrubs it

## Custom Events Hooks
These are all custom events announced by the modal that can be attached to externally:

- [ ] GA.CommentModal.preInit
- [ ] GA.CommentModal.postInit
- [ ] GA.CommentModal.preDestroy
- [ ] GA.CommentModal.postDestroy
- [ ] GA.CommentModal.preOpen
- [ ] GA.CommentModal.postOpen
- [ ] GA.CommentModal.preClose
- [ ] GA.CommentModal.postClose
- [ ] GA.CommentModal.preLoad
- [ ] GA.CommentModal.postLoad
- [ ] GA.CommentModal.preSubmit
- [ ] GA.CommentModal.postSubmit
- [ ] GA.CommentModal.error

## Custom Events
These are functions you can inject in order to affect change directly within the modal
- [ ] onSubmit - just before a save happens. use this to massage the data before it's sent
- [ ] onLoad - just after data is loaded, but before rendering begins. use this to massage the returned json

### TODO
- [x] get a plugin layout that works
- [ ] layout API structure
- [ ] get default template HTML figured out
- [ ] get Hogan integration working
- [ ] get fetch code working
- [ ] get post code working
- [ ] get unhooked comment modal working
