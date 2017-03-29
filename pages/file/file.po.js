var FilesPage = function() {
  var locators = {
    filesMenuButton: element(by.css("button[aria-label*=Files]")),
    header: element(by.xpath("//h3/span[text()='Files']")),
    emptyContent: element(by.css(".empty-state")),
    searchBar: element(by.id("search")),
    fileListContainer: element(by.css(".wfm-file-list")),
    fileList: $$('[ng-repeat*=file]'),
    fileDetail: {
      closeButton: element(by.css("[aria-label*=Close")),
      container: element(by.css('file-detail')),
      title: element(by.css('.content-toolbar')).element(by.css('h3')),
      detailVal: $$('file-detail > div > md-list > md-list-item > .md-list-item-text > h3')
    }
  };

  var commands = {
    getFile: function(index) {
      return locators.fileList.get(index);
    },
    getFileDetail: function() {
      var fileDetail = {};

      fileDetail.name = locators.fileDetail.detailVal.get(0);
      fileDetail.uid = locators.fileDetail.detailVal.get(1);
      fileDetail.owner = locators.fileDetail.detailVal.get(2);
      fileDetail.preview = locators.fileDetail.detailVal.get(3).element(by.css('img'));

      return fileDetail;
    },
    closeFileDetail: function() {
      return locators.fileDetail.closeButton.click();
    }
  };

  return {locators, commands};
};

module.exports = new FilesPage();