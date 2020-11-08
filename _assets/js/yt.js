/**
  Cached version of:
  https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/
*/

/**
 * Minified by jsDelivr using Terser v5.3.5.
 * Original file: /gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
class LiteYTEmbed extends HTMLElement{connectedCallback(){this.videoId=encodeURIComponent(this.getAttribute("videoid"));const e=this.getAttribute("playlabel");this.playLabel=e?encodeURIComponent(e):"Play",this.posterUrl=`https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`,LiteYTEmbed.addPrefetch("preload",this.posterUrl,"image"),this.style.backgroundImage=`url("${this.posterUrl}")`;let t=this.querySelector(".lty-playbtn");t||(t=document.createElement("button"),t.type="button",t.classList.add("lty-playbtn"),t.title=decodeURIComponent(this.playLabel),this.append(t)),this.addEventListener("pointerover",LiteYTEmbed.warmConnections,{once:!0}),this.addEventListener("click",(e=>this.addIframe()))}static addPrefetch(e,t,d){const n=document.createElement("link");n.rel=e,n.href=t,d&&(n.as=d),document.head.append(n)}static warmConnections(){LiteYTEmbed.preconnected||(LiteYTEmbed.addPrefetch("preconnect","https://www.youtube-nocookie.com"),LiteYTEmbed.addPrefetch("preconnect","https://www.google.com"),LiteYTEmbed.addPrefetch("preconnect","https://googleads.g.doubleclick.net"),LiteYTEmbed.addPrefetch("preconnect","https://static.doubleclick.net"),LiteYTEmbed.preconnected=!0)}addIframe(){const e=new URLSearchParams(this.getAttribute("params")||[]);e.append("autoplay","1");const t=`\n<iframe width="560" height="315" frameborder="0"\n  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen\n  src="https://www.youtube-nocookie.com/embed/${this.videoId}?${e.toString()}"\n></iframe>`;this.insertAdjacentHTML("beforeend",t),this.classList.add("lyt-activated")}}customElements.define("lite-youtube",LiteYTEmbed);
