north-american-octo-robot
=========================

This plugin is an answer for requiring comments on various portions of proejcts I work on. I wanted something that would:

 - easily display a comment modal
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
Fill this in as they start to exist

Variations of the open command:
- [ ] $(el).commentModal('open') // use defaults
- [ ] $.commentModal('open', {options}, {jsonObj})

Variations of the load command: (only runs when the modal is open)
- [ ] $(el).commentModal('load') // use defaults
- [ ] $(el).commentModal('load', url)
- [ ] $(el).commentModal('load', {url:url, method:method, data:data})
- [ ] $(el).commentModal('load', {json})

Variations of save command: (only runs when the modal is open)
- [ ] $(el).commentModal('save') // use defaults
- [ ] $(el).commentModal('save', url)
- [ ] $(el).commentModal('save', {url:url, method:method, data:data})
- [ ] $.commentModal('save') // returns a json object
- [ ] $(el).commentModal('close')

## Custom Events
- [ ] GA.CommentModal.preInit
- [ ] GA.CommentModal.postInit
- [ ] GA.CommentModal.preDestroy
- [ ] GA.CommentModal.postDestroy
- [ ] GA.CommentModal.opening
- [ ] GA.CommentModal.opened
- [ ] GA.CommentModal.closing
- [ ] GA.CommentModal.closed
- [ ] GA.CommentModal.beforeLoad
- [ ] GA.CommentModal.loaded
- [ ] GA.CommentModal.beforeSubmit
- [ ] GA.CommentModal.submitted
- [ ] GA.CommentModal.error

### TODO
- [x] get a plugin layout that works
- [ ] layout API structure
- [ ] get Hogan integration working
- [ ] get fetch code working
- [ ] get post code working
- [ ] get unhooked comment modal working
