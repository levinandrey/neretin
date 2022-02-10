LJ.UI.registerTemplate('templates-Widgets-share', "<div class=\"b-sharethis\"> <div class=\"b-sharethis-head\">${title}</div> <div class=\"b-sharethis-services\"> {{each(i, item) items}} <span class=\"b-sharethis-${item.service}\"> <a href=\"${item.url}\" target=\"_blank\" data-service=\"${item.service}\" class=\"b-sharethis-item\">${item.title}</a> </span> {{/each}} </div> </div>", 'JQuery.stat');

LJ.UI.registerTemplate('templates-Widgets-popupcontent', "<div class=\"b-popup-content {{if $data.options_centered}}b-popup-options-centered{{/if}}\"> {{if $data.show_header}} <div class=\"b-popup-content-header\"> <span> {{html $data.header_text}} </span> </div> {{/if}} {{html $data.confirm_text}} {{if $data.show_check}} <div class=\"b-popup-content-inner\"> <input id=\"b-popup-check\" type=\"checkbox\" class=\"b-popup-check\"> <label for=\"b-popup-check\" class=\"b-popup-check-text\"> {{html $data.check_text}} </label> </div> {{/if}} <div class=\"b-popup-submit-options\"> <span class=\"b-popup-preloader\"> <span class=\"b-popup-preloader-inner\"> <button class=\"b-popup-btn\" type=\"button\">{{html $data.yes_text}}</button> <i class=\"preloader\"></i> </span> <a href=\"javascript: void(0);\" class=\"b-popup-cancel\">{{html $data.no_text}}</a> </span> </div> </div>", 'JQuery.stat');

LJ.UI.registerTemplate('templates-Widgets-bubble', "<div class=\"b-popup bubble-node\" style=\"display: none;\"> <div class=\"b-popup-outer\"> <div class=\"b-popup-inner\"> {{if !($data.modal)}} <i class=\"i-popup-arr i-popup-arrtl\"><i class=\"i-popup-arr-brdr-outer\"><i class=\"i-popup-arr-brdr-inner\"><i class=\"i-popup-arr-bg\"></i></i></i></i> {{/if}} <i class=\"i-popup-close\"></i> </div> </div> </div>", 'JQuery.stat');

LJ.UI.registerTemplate('templates-CleanHtml-Repost', "<span class=\"lj-button repost-button {{if $data.reposted}}repost-button-active{{/if}} lj-button-light\"><span class=\"lj-button-wrapper\"> <span class=\"lj-button-link\"> <span class=\"lj-button-a\"> <span title=\'Сделать репост этой записи в моём журнале\' data-href=\"{{html $data.url}}\" class=\"lj-button-b\"><span class=\"lj-button-icon {{if $data.single}}lj-button-icon-sinlge{{/if}}\"></span> Репост</span> <span title=\'Удалить репост\' data-href=\"{{html $data.url}}\" class=\"lj-button-b lj-button-b-reposted\"><span class=\"lj-button-icon {{if $data.single}}lj-button-icon-sinlge{{/if}}\"></span> Репост сделан</span> <span title=\'Уже перепостили\' class=\"lj-button-c {{if !($data.count)}}empty{{/if}}\"> <span class=\"lj-button-arrow\"><span class=\"lj-button-arrow-bg\"></span></span> <span class=\"lj-like-item-count\">{{html $data.count}}</span> </span> </span> </span> </span></span>", 'JQuery.stat');

LJ.UI.registerTemplate('templates-CleanHtml-PaidRepost', "<span class=\"lj-button paidrepost-button {{if $data.reposted}}paidrepost-button-active{{/if}} lj-button-light\"><span class=\"lj-button-wrapper\"> <span class=\"lj-button-link\"> <span class=\"lj-button-a\"> <span title=\'{{if $data.owner}}Бюджет на репосты:{{html $data.budget}}жетонов{{else}}Репост{{/if}}\' data-href=\"{{html $data.url}}\" class=\"lj-button-b\"><span class=\"lj-button-icon {{if $data.single}}lj-button-icon-sinlge{{/if}}\"></span> <span class=\"paidrepost-button-label\">Репост</span> <span class=\"paidrepost-button-cost\">{{if !($data.owner)}}{{html $data.cost}}{{/if}}</span> </span> <span data-href=\"{{html $data.url}}\" title=\'{{if $data.owner}}Бюджет на репосты:{{html $data.budget}}жетонов{{else}}Удалить репост{{/if}}\' class=\"lj-button-b lj-button-b-reposted\"><span class=\"lj-button-icon {{if $data.single}}lj-button-icon-sinlge{{/if}}\"></span> <span class=\"paidrepost-button-label\">Репост уже сделан</span><span class=\"paidrepost-button-cost\">{{if !($data.owner)}}{{html $data.cost}}{{/if}}</span> </span> <span title=\'Repost counter\' class=\"lj-button-c {{if !($data.count)}}empty{{/if}}\"> <span class=\"lj-button-arrow\"><span class=\"lj-button-arrow-bg\"></span></span> <span class=\"lj-like-item-count\">{{html $data.count}}</span> </span> </span> </span> </span></span>", 'JQuery.stat');

LJ.UI.registerTemplate('templates-CleanHtml-reposted', "{{if $data.content}} {{each ($value.users || $data.users)}}{{if !((!$index) && !($value.dropComma || $data.dropComma))}}, {{/if}}<a href=\"{{html ($value.url || $data.url)}}\">{{html ($value.user || $data.user)}}</a>{{/each}} {{else}} <div class=\"b-reposted-popup\"> <div class=\"b-reposted-popup-header\">Перепостили</div> <div class=\"b-reposted-popup-content b-reposted-popup-load\"></div> <div class=\"b-reposted-popup-footer\"><a href=\"javascript:void(0);\">ещё...</a></div> </div> {{/if}}", 'JQuery.stat');
