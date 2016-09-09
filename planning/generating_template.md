
options = {
  endpoint,
  name,
  templatePath,
  controler,
}
data = {
  jobId,
  phoneNumber,
  robotName
}


generateTemplate(options, data) {

  1) fetchdata from api
  apiDataPromise = fetchApiData(options.name || defaultEndPoint);

  2) fetch template for prediction body
  templateFilePromise = fetchTemplateFile(options);

  3) fetch templates for prediction header and footer
  headerFilePromies = fetchHeaderFile('header.hbs');
  footerFilePromies = fetchHeaderFile('header.hbs');

  //  wait for everything to load
  Promise.all(apiDataPromise, templateFilePromise, headerFilePromise, footerFilePromise)
    .then(() => {

      //  run controller to modify api data and generate anything dynamic for template
      const dynamicTemplateData = options.controller(apiData)

      //  merge dynamic body data and data for header and footer
      const templateData = dynamicTempateData.merge(data);


      //  render template and done
      const render = template(template, templateData);
      return render;

    }).
    catch(() => {

    });


}



