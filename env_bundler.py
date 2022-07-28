from os import remove
try:
    
    remove("env-config.js")
    
    env_data = {}
    with open("prod.env", "r") as env_file:
        for env_values in env_file.readlines():
            env_name = env_values.split("=")[0]
            env_value = env_values.split("=")[1]
            if(env_name not in env_data):
                env_data[env_name] = env_value 
            else:
                continue
    
    with open("env-config.js", "w") as env_config:
        env_config.write("window._env_ = {")
        for env_index, item in enumerate(env_data):
            if(env_index != len(env_data) - 1):
                 env_key = env_data[item].replace("\n", "")
                 env_config.write(f'\n\t{item}:"{env_key}",\n')
            else:
                 env_config.write(f'\t{item}: "{env_data[item]}"\n')
        env_config.write("}")
except:
    env_data = {}
    with open("prod.env", "r") as env_file:
        for env_values in env_file.readlines():
            env_name = env_values.split("=")[0]
            env_value = env_values.split("=")[1]
            if(env_name not in env_data):
                env_data[env_name] = env_value 
            else:
                continue
    
    with open("env-config.js", "w") as env_config:
        env_config.write("window._env_ = {")
        for env_index, item in enumerate(env_data):
            env_key = env_data[item].replace("\n", "")
            if(env_index != len(env_data) - 1):
                 env_key = env_data[item].replace("\n", "")
                 env_config.write(f'\n\t{item}:"{env_key}",\n')
            else:
                 env_config.write(f'\t{item}: "{env_data[item]}"\n')
        env_config.write("}")
