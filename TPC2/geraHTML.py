import json

def ordCidade(cidade):
    return cidade["nome"]


f = open("mapa.json") # Open the file

mapa = json.load(f) # Load json from file

cidades = mapa["cidades"] # Pegar nas cidades

cidades.sort(key=ordCidade) # Ordenar as cidades

ligacoes = mapa["ligações"] # Pegar nas ligações

cidades_dict = {} # Facilitar o acesso ao nome da cidade a partir do id 
distritos = {} # Para cada distrito, as cidades correspondentes

# Mapeia o id de cada cidade para o seu nome
for cidade in cidades:
    if cidade["id"] not in cidades_dict:
        cidades_dict[cidade["id"]] = cidade
    
        distrito = cidade["distrito"]
    if distrito not in distritos:
        distritos[distrito] = list()

    distritos[distrito].append(cidade["nome"])

# Ordenar os distritos
distritos_sorted = list(distritos.keys())
distritos_sorted.sort()

for lista_locais in distritos.values():
    lista_locais.sort()

# Facilita o acesso às origens e destinos a partir do id de uma det cidade
origens = {}
destinos = {}

# Preencher os dicionários criados (origens e destinos)
for ligacao in ligacoes:
    if ligacao['destino'] not in origens:
        origens[ligacao['destino']] = list() 
    origens[ligacao['destino']].append((ligacao['origem'], ligacao['distância']))

    if ligacao['origem'] not in destinos:
        destinos[ligacao['origem']] = list()

    destinos[ligacao['origem']].append((ligacao['destino'], ligacao['distância']))

# Criação da página index.html

pagHTML = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Índice de cidades</title>
</head>
<body>
    <ul>
"""

for d in distritos_sorted:
    pagHTML += f"""
        <li>
            <h5>{d}</h5>
            <ul>"""

    for cidade in distritos[d]:
        pagHTML += f"""
                <li>
                    <a href="localhost:7777/{cidade}">{cidade}</a>
                </li>
        """

    pagHTML += """
        </ul>
        </li>
    """

pagHTML += """
    </ul>
</body>
</html>
"""

index_file = open("index.html", mode="w")
index_file.write(pagHTML)

for cidade_id in cidades_dict.keys():
    cidade = cidades_dict[cidade_id]
    new_file = open("cidades/" + cidade["id"] + ".html", mode="w")
    pagHTML = """<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Índice de cidades</title>
                </head>
                <body>"""
    pagHTML += f"""<h1>{cidade["nome"]}</h1>
                   <h2>Ligações</h2>
                   <h3>Origens</h3>
                   <ul>"""
    
    if cidade["id"] in origens:
        for o in origens[cidade["id"]]:
            pagHTML += f""" <li>
                                <a href="localhost:7777/{o[0]}">{cidades_dict[o[0]]["nome"]} - {o[1]}</a> 
                            </li>
                        """
    
    pagHTML += f"""
                    </ul>
                    <h3>Destinos</h3>
                    </ul>
                """
    
    if cidade["id"] in destinos:
        for d in destinos[cidade["id"]]:
            pagHTML += f""" <li>
                                <a href="localhost:7777/{d[0]}">{cidades_dict[d[0]]["nome"]} - {d[1]}</a>
                            </li>
                        """
    
    pagHTML += f"""
                    </ul>
                </body>
                </html>
                """

    new_file.write(pagHTML)
