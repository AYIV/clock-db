Vue.componentEx = async (id, definition) => {
    if (definition.templateUrl) {
        definition.template = await (await fetch(definition.templateUrl)).text();

        delete definition.templateUrl;
    }
    return Vue.component(id, definition);
};