/* Fills the latest-episode heading and summary from the podcast RSS feed, so the
   section never needs hand-editing when an episode ships.

   The player above it is a *show* embed, which Spotify always points at the newest
   episode — so it and the feed's first item are the same episode by construction.
   The feed carries no Spotify episode id, which is why the player is show-level.

   If anything here fails, the markup that shipped in index.html is left alone. */
(function () {
  var FEED = 'https://anchor.fm/s/11305abf4/podcast/rss';
  var ITUNES_NS = 'http://www.itunes.com/dtds/podcast-1.0.dtd';

  var titleEl = document.querySelector('[data-latest-title]');
  var summaryEl = document.querySelector('[data-latest-summary]');
  var toggleEl = document.querySelector('[data-summary-toggle]');
  if (!titleEl || !summaryEl) return;

  function tag(item, name) {
    var el = item.getElementsByTagName(name)[0];
    return el ? el.textContent.trim() : '';
  }

  function itunesTag(item, name) {
    var el = item.getElementsByTagNameNS(ITUNES_NS, name)[0];
    return el ? el.textContent.trim() : '';
  }

  function collapse(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  /* Descriptions are HTML, and hold far more than a summary: the first paragraph is
     the write-up, then a "Notes" block and bare source URLs meant for podcast apps.
     Taking the first paragraph keeps the landing page to the summary, and means the
     text always ends on a sentence rather than wherever a character count landed.
     Parsing to text also decodes entities and keeps feed markup out of innerHTML. */
  function summaryFrom(descriptionHtml) {
    var doc = new DOMParser().parseFromString(descriptionHtml, 'text/html');
    var paragraphs = doc.body.getElementsByTagName('p');
    for (var i = 0; i < paragraphs.length; i++) {
      var text = collapse(paragraphs[i].textContent);
      if (text) return text;
    }
    return collapse(doc.body.textContent); /* feeds that don't wrap in <p> */
  }

  /* Clamping is CSS; this only decides whether the toggle is worth showing. Measured
     after fonts settle, since swapping to DM Sans changes how many lines the text is. */
  function setupToggle() {
    if (!toggleEl) return;

    summaryEl.classList.add('is-clamped');

    if (summaryEl.scrollHeight <= summaryEl.clientHeight + 1) {
      summaryEl.classList.remove('is-clamped'); /* short enough to show whole */
      toggleEl.hidden = true;
      return;
    }

    toggleEl.hidden = false;
    toggleEl.addEventListener('click', function () {
      var collapsed = summaryEl.classList.toggle('is-clamped');
      toggleEl.setAttribute('aria-expanded', String(!collapsed));
      toggleEl.textContent = collapsed ? 'See more' : 'See less';
    });
  }

  fetch(FEED)
    .then(function (res) {
      if (!res.ok) throw new Error('feed HTTP ' + res.status);
      return res.text();
    })
    .then(function (xml) {
      var doc = new DOMParser().parseFromString(xml, 'application/xml');
      if (doc.getElementsByTagName('parsererror').length) throw new Error('bad feed xml');

      /* Trailers and bonus episodes shouldn't claim the latest-episode slot. */
      var items = Array.prototype.filter.call(
        doc.getElementsByTagName('item'),
        function (item) {
          var type = itunesTag(item, 'episodeType');
          return type === '' || type === 'full';
        }
      );
      if (!items.length) throw new Error('feed has no full episodes');

      var latest = items[0];
      var title = tag(latest, 'title');
      var summary = summaryFrom(tag(latest, 'description'));
      if (!title || !summary) throw new Error('latest episode is missing title or summary');

      /* Fall back to position in the feed if the publisher omits itunes:episode. */
      var number = itunesTag(latest, 'episode') || String(items.length);

      titleEl.textContent = 'ep ' + String(number).padStart(3, '0');
      titleEl.appendChild(document.createElement('br'));
      var em = document.createElement('em');
      em.textContent = title;
      titleEl.appendChild(em);

      summaryEl.textContent = summary;
    })
    .catch(function (err) {
      if (window.console) console.warn('Latest episode: keeping markup —', err.message);
    })
    .then(function () {
      /* Runs whether the fetch succeeded or fell back, so the toggle always matches
         whatever text ended up on the page. */
      return document.fonts ? document.fonts.ready : null;
    })
    .then(setupToggle);
})();
